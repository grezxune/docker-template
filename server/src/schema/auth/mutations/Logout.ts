import { Resolver, Mutation, Ctx, Authorized } from 'type-graphql'

import { MyContext } from '../../../MyContext'
import { sendRefreshToken } from '../../../utils/sendRefreshToken'

@Resolver()
export class Logout {
  @Mutation(() => Boolean)
  @Authorized()
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '')

    return true
  }
}
