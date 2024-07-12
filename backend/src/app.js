import express from 'express'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const port = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userRoutes)
app.use('/category', categoryRoutes)
app.use('/todo', todoRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
