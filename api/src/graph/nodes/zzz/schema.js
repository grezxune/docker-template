import { gql } from 'apollo-server'

export default gql`
  type Word {
    value: String!
    count: Int!
    day: Day!
  }

  type Day {
    date: String!
    words: [Word!]!
    totalSubmissions: Int!
  }

  type Query {
    word: [Word!]!
    day: Day
  }

  type Mutation {
    createWord(value: String, day: String!): Word
  }
`
