import express from 'express'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route'
import bookmarkRoute from './routes/bookmark.route'
import whitelistRoute from './routes/whitelist.route'
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoute)
app.use('/bookmark', bookmarkRoute)
app.use('/whitelist', whitelistRoute)

export default app
