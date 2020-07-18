import { Response } from 'express'

export const sendRefreshToken = (res: Response, token: string) => {
  // const date = new Date()

  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
    // expires: new Date(date.getDate() + 7),
  })
}
