import * as userModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(async (req, res) => {
  const userData = req.body
  if (await userModel.getUserByEmail(userData.email)) {
    return res.status(400).json({ message: 'User already exists' })
  }
  const user = await userModel.createUser(userData)
  res.status(201).json(user)
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.getUserByEmail(email)
  if (!user || !(await userModel.matchPassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }
  res.status(200).json(user)
})

export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' })
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
