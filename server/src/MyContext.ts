import { Request, Response } from 'express'

export enum ROLE_ENUM {
  REGULAR = 'REGULAR',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}
export interface MyContext {
  req: Request
  res: Response
  user?: { userId: string; roles: ROLE_ENUM[] }
}
