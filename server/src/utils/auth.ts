import { sign } from 'jsonwebtoken'
import { User } from '../models/user'

export const createAccessToken = (user: User) => {
  console.log('user for access token:', user)
  return sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (user: User) => {
  console.log('user for refresh token:', user)
  return sign(
    { userId: user.userId, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  )
}
