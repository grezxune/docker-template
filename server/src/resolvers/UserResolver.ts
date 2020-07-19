import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  Int,
  FieldResolver,
  Root,
  InputType,
  Authorized,
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { MyContext } from '../MyContext'
import { createAccessToken, createRefreshToken } from '../utils/auth'
import { sendRefreshToken } from '../utils/sendRefreshToken'
import { verify } from 'jsonwebtoken'
import { User } from '../models/user'
import { userRepository } from '../repositories'
import { ApolloError } from 'apollo-server-express'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
  @Field(() => User)
  user: any
}

@Resolver(() => User)
export class UserFieldResolvers {
  @Field(() => String)
  @FieldResolver()
  id(@Root() user: User): String {
    return user.userId
  }
}

@InputType()
class SignUpInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  bye(@Ctx() { user }: MyContext) {
    return `Your user id is: ${user!.userId}`
  }

  @Query(() => [User])
  async users() {
    return userRepository.getAll()
  }

  @Query(() => User, { nullable: true })
  async viewer(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization']

    if (!authorization) {
      return null
    }

    try {
      const token = authorization.split(' ')[1]
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
      return userRepository.getById(payload.userId)
    } catch (err) {
      console.log('Error in me query:', err)
      return null
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await userRepository.getByEmail(email)

    if (!user) {
      throw new ApolloError(`Invalid login.`)
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new ApolloError(`Invalid login.`)
    }

    // Login successful
    sendRefreshToken(res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user),
      user,
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '')

    return true
  }

  @Mutation(() => Boolean)
  @Authorized()
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    return userRepository.incrementTokenVersion(userId)
  }

  @Mutation(() => Boolean)
  async signUp(
    @Arg('input') { firstName, lastName, email, password }: SignUpInput
  ) {
    // TODO - Move this hashing logic to user repo
    const hashedPassword = await hash(password, 12)

    try {
      await userRepository.addUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      })
    } catch (e) {
      return false
    }

    return true
  }
}
