import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-core'

export default (email) => {
  try {
    const now = new Date()
    const numberOfDaysForTokenToBeValid = 2

    return jwt.sign(
      {
        email: email,
        iss: 'BitBelt GQL',
        iat: now.valueOf(),
        exp: now
          .setDate(now.getDate() + numberOfDaysForTokenToBeValid)
          .valueOf(),
        sub: 'BitBelt User',
        audience: 'BitBelt Users',
      },
      process.env.JWT_SECRET || '',
      { algorithm: process.env.JWT_ALGORITHM }
    )
  } catch (e) {
    console.log('Error generating JWT:', e.message)
    throw new ApolloError('An error occurred.', 'INTERNAL_SERVER_ERROR')
  }
}
