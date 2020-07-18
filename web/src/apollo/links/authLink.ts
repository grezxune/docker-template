import { setContext } from '@apollo/client/link/context'
import { getAccessToken } from '../../accessToken'

export const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
