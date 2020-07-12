import userRepository from './repository'
import { createPasswordHash } from '../auth/passwordHash'
import generateSignedJwt from '../auth/generateSignedJwt'

export default {
  Query: {
    viewer: () => ({}),
  },
  Mutation: {
    emailSignUp: async (
      parent,
      { input: { firstName, lastName, email, password } },
      ctx
    ) => {
      await userRepository.addUser({
        firstName,
        lastName,
        email,
        passwordHash: createPasswordHash(password),
      })

      return {
        token: generateSignedJwt(email),
      }
    },
  },
  User: {
    id: () => '1',
    email: (parent, args, { user }) =>
      !console.log(user) && 'tomtrezb2003@gmail.com',
  },
}
