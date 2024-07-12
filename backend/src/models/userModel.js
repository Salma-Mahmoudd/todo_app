import { prisma } from '../utils/database.js'

export const createUser = async userData => {
  /* 
    userData is an object with the following properties:
    {
        name: "USER NAME",
        email: "EMAIL",
        password: "PASSWORD"
    } 
    */
  return await prisma.user.create({
    data: userData
  })
}

export const getUserByEmail = async email => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

export const getUserById = async id => {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

export const updateUser = async (id, newData) => {
  return await prisma.user.update({
    where: {
      id: id
    },
    data: { newData }
  })
}

export const deleteUser = async id => {
  return await prisma.user.delete({
    where: {
      id: id
    }
  })
}
