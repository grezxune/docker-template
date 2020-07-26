import {
  ObjectType,
  Field,
  FieldResolver,
  Root,
  Resolver,
  Query,
} from 'type-graphql'
import { userRepository } from '../../repositories'

@Resolver(() => User)
@ObjectType()
export class User {
  userId: string
  password: string
  tokenVersion: number

  @Field()
  @FieldResolver()
  id(@Root() user: User): String {
    return user.userId
  }

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Query(() => [User])
  async users() {
    return userRepository.getAll()
  }
}
