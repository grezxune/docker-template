import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    name: UserName!
    email: String!
  }

  type UserName {
    first: String!
    last: String!
    full: String!
  }

  extend type Query {
    viewer: User
  }

  extend type Mutation {
    emailSignUp(input: EmailSignUpInput!): EmailSignUpPayload!
  }

  type EmailSignUpPayload {
    token: String!
  }

  input EmailSignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`
