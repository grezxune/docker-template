import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { getAccessToken, setAccessToken } from '../../accessToken'
import jwtDecode from 'jwt-decode'

export const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()

    if (!token) {
      return true
    }

    try {
      const { exp } = jwtDecode(token)

      if (Date.now() >= exp * 1000) {
        return false
      } else {
        return true
      }
    } catch (e) {
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4001/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken)
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin')
  },
})
