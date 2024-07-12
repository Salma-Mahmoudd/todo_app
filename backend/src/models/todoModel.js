import { prisma } from '../utils/database.js'

export const createTodo = async todoData => {
  return await prisma.todo.create({
    data: {
      description: todoData.description,
      dueDate: new Date(todoData.dueDate),
      reminder: todoData.reminder ? new Date(todoData.reminder) : null,
      categoryId: +todoData.categoryId,
      userId: todoData.userId
    }
  })
}

export const getTodosByUserId = async userId => {
  return await prisma.todo.findMany({
    where: {
      userId: userId
    }
  })
}

export const getTodoByCategoryId = async categoryId => {
  return await prisma.todo.findMany({
    where: {
      categoryId: categoryId
    }
  })
}

export const getTodo = async id => {
  return await prisma.todo.findUnique({
    where: {
      id: id
    }
  })
}

export const updateTodo = async (id, newData) => {
  return await prisma.todo.update({
    where: {
      id: id
    },
    data: newData
  })
}

export const deleteTodo = async id => {
  return await prisma.todo.delete({
    where: {
      id: id
    }
  })
}
