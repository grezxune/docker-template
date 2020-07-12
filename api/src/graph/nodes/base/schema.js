import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    placeholder: String
  }

  type Query {
    placeholder: String
  }

  directive @isAuthenticated on FIELD | FIELD_DEFINITION | OBJECT
  directive @hasRole(roles: [String!]!) on FIELD | FIELD_DEFINITION | OBJECT
  directive @hasScope(scopes: [String!]!) on FIELD | FIELD_DEFINITION | OBJECT
`
