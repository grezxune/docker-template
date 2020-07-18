import { createHttpLink } from '@apollo/client'

export const httpLink = createHttpLink({
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
})
