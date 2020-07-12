import { gql } from 'apollo-server'

export default gql`
  extend type Mutation {
    loginWithEmail(input: LoginWithEmailInput!): LoginWithEmailPayload!
  }

  input LoginWithEmailInput {
    email: String!
    password: String!
  }

  type LoginWithEmailPayload {
    token: String!
  }
`
