import { verifyToken } from '../utils/auth.js'

export function authenticationMiddleware(req, res, next) {
  let token = req.cookies?.jwtToken || req.cookies?.token
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ error: 'You are not authenticated' })
  }

  try {
    req.user = verifyToken(token)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function adminOnly(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'You are not authenticated' })
  }
  if (req.user.role !== 'admin' && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden: Admin access only' })
  }
  next()
}

export function staffOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'You are not authenticated' })
  }
  if (req.user.role !== 'admin' && req.user.role !== 'staff' && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden: Staff or Admin access only' })
  }
  next()
}
