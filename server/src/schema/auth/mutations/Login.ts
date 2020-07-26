import { Resolver, Mutation, ObjectType, Field, Arg, Ctx } from 'type-graphql'
import { compare } from 'bcryptjs'
import { ApolloError } from 'apollo-server-express'

import { User } from '../../user/User'
import { MyContext } from '../../../MyContext'
import { userRepository } from '../../../repositories'
import { createRefreshToken, createAccessToken } from '../../../utils/auth'
import { sendRefreshToken } from '../../../utils/sendRefreshToken'

@Resolver()
export class Login {
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
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
  @Field(() => User)
  user: User
}
