import { Resolver, Query, Ctx } from 'type-graphql'
import { verify } from 'jsonwebtoken'

import { User } from '../User'
import { MyContext } from '../../../MyContext'
import { userRepository } from '../../../repositories'

@Resolver()
export class Viewer {
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
}
