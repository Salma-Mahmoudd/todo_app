import * as todoModel from '../models/todoModel.js'
import { getCategory } from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

export const createTodo = asyncHandler(async (req, res) => {
  const todoData = req.body
  const userId = req.user.id;
  if (!todoData.description) {
    return res.status(400).json({ message: 'Description is required' })
  }
  if (!todoData.dueDate) {
    return res.status(400).json({ message: 'Due date is required' })
  }
  const todo = await todoModel.createTodo({ ...todoData, userId })
  res.status(201).json(todo)
})

export const getTodosByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const todos = await todoModel.getTodosByUserId(userId)
  res.status(200).json(todos)
})

export const getTodoByCategoryId = asyncHandler(async (req, res) => {
  const categoryId = +req.params.categoryId
  if (!(await getCategory(categoryId))) {
    return res.status(404).json({ message: 'Category not found' })
  }
  const todos = await todoModel.getTodoByCategoryId(categoryId)
  res.status(200).json(todos)
})

export const updateTodo = asyncHandler(async (req, res) => {
  const id = +req.params.id
  const newData = req.body
  if (!await todoModel.getTodo(id)) {
    return res.status(404).json({ message: 'Todo not found' })
  }
  if (newData.categoryId) {
    if (!(await getCategory(newData.categoryId))) {
      return res.status(404).json({ message: 'Category not found' })
    }
    newData.categoryId = +newData.categoryId
  }
  if (newData.reminder) {
    newData.reminder = new Date(newData.reminder)
  }
  if (newData.dueDate) {
    newData.dueDate = new Date(newData.dueDate)
  }
  const updatedTodo = await todoModel.updateTodo(id, newData)
  res.status(200).json(updatedTodo)
})

export const deleteTodo = asyncHandler(async (req, res) => {
  const id = +req.params.id
  await todoModel.deleteTodo(id)
  res.status(204).end()
})
