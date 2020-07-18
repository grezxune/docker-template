import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class User {
  userId: string

  @Field()
  email: string

  password: string
  tokenVersion: number
}
