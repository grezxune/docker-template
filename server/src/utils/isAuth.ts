import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql'
import { MyContext } from '../MyContext'
import { verify } from 'jsonwebtoken'

export const isAuth = ({ roles }: { roles?: string[] }) => (
  { context }: ResolverData<MyContext>,
  next: NextFn
): Promise<MiddlewareFn<MyContext>> => {
  const authorization = context.req.headers['authorization']
  console.log(roles)

  if (!authorization) {
    throw new Error('Not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    context.payload = payload as any
  } catch (e) {
    throw new Error('Not authenticated')
  }
  return next()
}
