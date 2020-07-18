import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { RepositoryBase } from '../repositoryBase'
import { query } from '../db/neo4j/query'
import { compare } from 'bcryptjs'
import { User } from '../models/user'
import { createAccessToken } from '../utils/auth'

class UserRepository extends RepositoryBase {
  constructor() {
    super(['User'], 'User')
  }

  getByEmail = async (email: string): Promise<User | null> => {
    const user = await query(
      `
        MATCH (user :User)
        WHERE user.email =~ '(?i)${email}'
        RETURN user
      `,
      {}
    )

    if (user?.length === 0) {
      return null
    } else {
      return user[0]
    }
  }

  doesUserExist = async (email: string) => {
    const existingUser = await this.getByEmail(email)

    return !!existingUser
  }

  addUser = async (user: { email: string; password: string }) => {
    if (await this.doesUserExist(user.email)) {
      throw new Error(`User ${user.email} already exists.`)
    } else {
      return query(
        `
          CREATE
            (user :User { userId: $userId, email: $email,
            password: $password, signupDateTime: $signupDateTime })
          RETURN user
          `,
        {
          ...user,
          userId: uuidv4(),
          signupDateTime: moment().format(),
        }
      )
    }
  }

  loginWithEmail = async (email: string, password: string) => {
    const existingUser = await this.getByEmail(email)

    if (existingUser) {
      const isCorrectPassword = await compare(password, existingUser.password)

      if (isCorrectPassword) {
        query(
          `
            MATCH (user :User { userId: $userId })
            CREATE (user) -[:LOGGED_IN { usingEmail: $usingEmail }]->
                (:UserLogin { timestamp: $timestamp })
            RETURN user
            `,
          {
            usingEmail: true,
            userId: existingUser.userId,
            timestamp: moment().format(),
          }
        )

        return { ok: true, accessToken: createAccessToken(existingUser) }
      } else {
        throw new Error(`Error logging in with email ${email}.`)
      }
    } else {
      throw new Error(`Error logging in with email ${email}.`)
    }
  }

  incrementTokenVersion = async (userId: number) => {
    try {
      query(
        `
        MATCH (user :User { userId: $userId })
        SET user.tokenVersion = user.tokenVersion + 1
        `,
        {
          userId,
        }
      )
      return true
    } catch (e) {
      return false
    }
  }
}

export const userRepository = new UserRepository()
