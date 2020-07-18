import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/UserResolver'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { verify } from 'jsonwebtoken'
import { createAccessToken, createRefreshToken } from './utils/auth'
import { sendRefreshToken } from './utils/sendRefreshToken'
import { UserRepository } from './repositories/userRepository'
;(async () => {
  const app = express()
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  app.use(cookieParser())

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid

    if (!token) {
      return res.send({ ok: false, accessToken: '' })
    }

    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (e) {
      return res.send({ ok: false, accessToken: '' })
    }

    console.log('TOKEN IN REFRESH TOKEN:', token)
    console.log('PAYLOAD IN REFRESH TOKEN:', payload)
    const user = await new UserRepository().getById(payload.userId)
    console.log('USER IN REFRESH TOKEN:', user)

    if (!user) {
      return res.send({ ok: false, accessToken: '' })
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4001, () => {
    console.log('Express server started on port 4001')
  })
})()
