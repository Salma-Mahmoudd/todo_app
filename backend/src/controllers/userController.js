import * as userModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = asyncHandler(async (req, res) => {
  const userData = req.body
  if (await userModel.getUserByEmail(userData.email)) {
    return res.status(400).json({ message: 'User already exists' })
  }
  userData.password = await bcrypt.hash(userData.password, 10)
  const user = await userModel.createUser(userData)
  res.status(201).json(user)
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.getUserByEmail(email)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.SECRET_KEY
  )
  res.cookie('token', token)
  res.status(200).json({ token })
})

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully' })
})

export const updateUser = asyncHandler(async (req, res) => {
  const id = req.user.id
  const newData = req.body
  const updatedUser = await userModel.updateUser(id, newData)
  res.status(200).json(updatedUser)
})

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.user.id
  await userModel.deleteUser(id)
  res.status(200).json({ message: 'User deleted successfully' })
})
