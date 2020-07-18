import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  FieldResolver,
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { MyContext } from '../MyContext'
import { createAccessToken, createRefreshToken } from '../utils/auth'
import { isAuth } from '../utils/isAuth'
import { sendRefreshToken } from '../utils/sendRefreshToken'
import { verify } from 'jsonwebtoken'
import { User } from '../models/user'
import { UserRepository } from '../repositories/userRepository'
import { ApolloError } from 'apollo-server-express'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
  @Field(() => User)
  user: any
}

@Resolver(() => User)
export class UserTypeResolver {
  @Field(() => String)
  @FieldResolver()
  id(user: User): String {
    return user.userId
  }
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hi!'
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `Your user id is: ${payload!.userId}`
  }

  @Query(() => [User])
  async users() {
    return new UserRepository().getAll()
  }

  @Query(() => User, { nullable: true })
  async viewer(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization']

    if (!authorization) {
      return null
    }

    try {
      const token = authorization.split(' ')[1]
      console.log('Token:', token)
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
      console.log('Payload: ', payload)
      return new UserRepository().getById(payload.userId)
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
    const user = await new UserRepository().getByEmail(email)

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
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    return new UserRepository().incrementTokenVersion(userId)
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12)

    try {
      await new UserRepository().addUser({
        email,
        password: hashedPassword,
      })
    } catch (e) {
      return false
    }

    return true
  }
}
