import { sign } from 'jsonwebtoken'
import { User } from '../schema/user/User'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
    algorithm: 'HS256',
  })
}

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.userId, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    }
  )
}
