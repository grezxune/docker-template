import { Resolver, Mutation, InputType, Field, Arg } from 'type-graphql'
import { hash } from 'bcryptjs'

import { userRepository } from '../../../repositories'

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
export class SignUp {
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
