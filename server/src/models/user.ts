import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class User {
  userId: string
  password: string
  tokenVersion: number

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string
}
