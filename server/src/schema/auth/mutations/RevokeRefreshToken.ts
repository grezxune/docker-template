import { Resolver, Mutation, Authorized, Arg, Int } from 'type-graphql'
import { userRepository } from '../../../repositories'

@Resolver()
export class RevokeRefreshToken {
  @Mutation(() => Boolean)
  @Authorized()
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    return userRepository.incrementTokenVersion(userId)
  }
}
