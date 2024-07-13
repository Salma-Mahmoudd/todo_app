import * as categoryModel from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

export const createCategory = asyncHandler(async (req, res) => {
  const name = req.body
  const userId = req.user.id
  if (!name.name) {
    return res.status(400).json({ message: 'Name is required' })
  }
  const category = await categoryModel.createCategory({ ...name, userId })
  res.status(201).json(category)
})

export const getCategories = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const categories = await categoryModel.getCategoriesByUserId(userId)
  res.status(200).json(categories)
})

export const updateCategory = asyncHandler(async (req, res) => {
  const id = +req.params.id
  const { newName } = req.body
  if (!newName) {
    return res.status(400).json({ message: 'Name is required' })
  }
  if (await categoryModel.getCategory(id)) {
    const updatedCategory = await categoryModel.updateCategory(id, newName)
    return res.status(200).json(updatedCategory)
  }
  res.status(404).json({ message: 'Category not found' })
})

export const deleteCategory = asyncHandler(async (req, res) => {
  const id = +req.params.id
  if (await categoryModel.getCategory(id)) {
    await categoryModel.deleteCategory(id)
    return res.status(204).end()
  }
  res.status(404).json({ message: 'Category not found' })
})
