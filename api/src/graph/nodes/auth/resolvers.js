import userRepository from '../user/repository'

export default {
  Query: {},
  Mutation: {
    loginWithEmail: async (parent, { input: { email, password } }) => {
      return userRepository.loginWithEmail(email, password)
    },
  },
}
