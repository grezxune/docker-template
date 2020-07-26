import { Login } from './auth/mutations/Login'
import { Logout } from './auth/mutations/Logout'
import { RevokeRefreshToken } from './auth/mutations/RevokeRefreshToken'
import { SignUp } from './auth/mutations/SignUp'

import { AllUsers } from './user/queries/AllUsers'
import { Viewer } from './user/queries/Viewer'
import { User } from './user/User'

export const resolvers = [
  Login,
  Logout,
  RevokeRefreshToken,
  SignUp,
  AllUsers,
  Viewer,
  User,
]
