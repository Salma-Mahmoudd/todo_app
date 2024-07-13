import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const authUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies['token']
  if (!token) {
    return res.status(401).json({ message: 'Token is required' })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }
    req.user = user
    next()
  })
})

