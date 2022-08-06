require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const courseRouter = require('./routes/courses')
const userRouter = require('./routes/users')

const connectDB = require('./db/connect')

const authMiddleware = require('./middleware/authentication')

app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/courses', authMiddleware, courseRouter)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Database connection established...')
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(`Error connecting to db: ${error}`);
    }
}

start()