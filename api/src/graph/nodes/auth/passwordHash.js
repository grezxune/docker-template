import bcrypt from 'bcrypt'

const createPasswordHash = (password) => {
  const passwordSaltRounds = 10

  return bcrypt.hashSync(password, bcrypt.genSaltSync(passwordSaltRounds))
}

const comparePassword = (passwordHash, password) => {
  return bcrypt.compareSync(password, passwordHash)
}

export { createPasswordHash, comparePassword }
