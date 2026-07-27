import bcrypt from 'bcrypt'
import User from '../data/user.js'

export const register = (user) => {
  return User.create(user)
}

export const login = async (user) => {
  const { email, password } = user
  const registeredUser = await User.findOne({ email })

  if (!registeredUser) {
    throw new Error('User not found')
  }

  const isValidPassword = await bcrypt.compare(password, registeredUser.password)
  if (!isValidPassword) {
    throw new Error('Invalid password')
  }

  return registeredUser
}
