import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import RepositoryBase from '../../repositoryBase'
import query from '../../../db/neo4j/query'
import { comparePassword } from '../auth/passwordHash'
import generateSignedJwt from '../auth/generateSignedJwt'

class UserRepository extends RepositoryBase {
  constructor() {
    super('User', 'User')
  }

  getByEmail = async (email) => {
    return query(
      `
        MATCH (user :User)
        WHERE user.email =~ '(?i)${email}'
        RETURN user
      `
    )
  }

  doesUserExist = async (email) => {
    const existingUser = await this.getByEmail(email)

    console.log(existingUser && existingUser.length > 0)
    return existingUser && existingUser.length > 0
  }

  addUser = async (user) => {
    if (await this.doesUserExist(user.email)) {
      throw new Error(`User ${user.email} already exists.`)
    } else {
      return query(
        `
          CREATE
            (user :User { userId: $userId, firstName: $firstName,
            lastName: $lastName, email: $email,
            passwordHash: $passwordHash, signupDateTime: $signupDateTime })
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

  loginWithEmail = async (email, password) => {
    const existingUser = (await this.getByEmail(email)).find((x) => !!x)

    if (existingUser && comparePassword(existingUser.passwordHash, password)) {
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

      return { token: generateSignedJwt(email) }
    } else {
      throw new Error(`Error logging in with email ${email}.`)
    }
  }
}

export default new UserRepository()
