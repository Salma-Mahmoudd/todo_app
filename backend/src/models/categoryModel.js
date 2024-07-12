import { prisma } from '../utils/database.js'

export const createCategory = async data => {
  /*
    data = {
        name: "Category Name",
        userId: "USER_ID",
    }
    */
  return await prisma.category.create({
    data: data
  })
}

export const getCategory = async id => {
  return await prisma.category.findUnique({
    where: {
      id: id
    }
  })
}

export const getCategoriesByUserId = async userId => {
  return await prisma.category.findMany({
    where: {
      userId: userId
    }
  })
}

export const updateCategory = async (id, newName) => {
  return await prisma.category.update({
    where: {
      id: id
    },
    data: {
      name: newName
    }
  })
}

export const deleteCategory = async id => {
  return await prisma.category.delete({
    where: {
      id: id
    }
  })
}
