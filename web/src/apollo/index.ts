import { ApolloClient, from } from '@apollo/client'
import { cache } from './cache'
import { tokenRefreshLink } from './links/tokenRefreshLink'
import { authLink } from './links/authLink'
import { httpLink } from './links/httpLink'

export const client = new ApolloClient({
  // For some reason Typescript doesn't agree with the tokenRefreshLink type here
  // @ts-ignore
  link: from([tokenRefreshLink, authLink, httpLink]),
  cache,
})
