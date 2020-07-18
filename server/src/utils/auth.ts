import { sign } from 'jsonwebtoken'
import { User } from '../models/user'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.userId, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  )
}
