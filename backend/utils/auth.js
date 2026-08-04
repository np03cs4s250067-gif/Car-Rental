import jwt from 'jsonwebtoken'

const COOKIE_NAME = 'jwtToken'
const TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

const JWT_SECRET =
  process.env.JWT_SECRET ||
  's7xNX7rmvKElVEH6Az89mhERvGPUKcatW75YX0HDltwj7Lcm6kPcbg'

export function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      role: user.role || (user.isAdmin ? 'admin' : 'customer'),
    },
    JWT_SECRET,
    { expiresIn: '30d' },
  )
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_MAX_AGE_MS,
    path: '/',
  })
}

export function clearAuthCookie(res) {
  const options = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  }
  res.clearCookie(COOKIE_NAME, options)
  res.clearCookie('token', options)
}

export { COOKIE_NAME }
