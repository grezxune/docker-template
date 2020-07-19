import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { verify } from 'jsonwebtoken'
import jwt from 'express-jwt'

import { createAccessToken, createRefreshToken } from './utils/auth'
import { UserResolver, UserFieldResolvers } from './resolvers/UserResolver'
import { sendRefreshToken } from './utils/sendRefreshToken'
import { userRepository } from './repositories'
import { MyContext } from './MyContext'
import { authChecker } from './utils/authChecker'
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

    const user = await userRepository.getById(payload.userId)

    if (!user) {
      return res.send({ ok: false, accessToken: '' })
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  app.use(
    jwt({
      secret: process.env.ACCESS_TOKEN_SECRET!,
      algorithms: ['HS256'],
      credentialsRequired: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, UserFieldResolvers],
      authChecker,
    }),
    context: ({ req, res }: { req: any; res: any }): MyContext => ({
      req,
      res,
      user: req.user,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4001, () => {
    console.log('Express server started on port 4001')
  })
})()
