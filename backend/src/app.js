import express from 'express'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import { authUser } from './middlewares/authUser.js'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', userRoutes)
app.use('/category', authUser, categoryRoutes)
app.use('/todo', authUser, todoRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
