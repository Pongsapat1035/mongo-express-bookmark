import express from 'express'
import authRoute from './routes/auth.route'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoute)

export default app
