import { Resolver, Query } from 'type-graphql'

import { User } from '../User'
import { userRepository } from '../../../repositories'

@Resolver()
export class AllUsers {
  @Query(() => [User])
  async users() {
    return userRepository.getAll()
  }
}
