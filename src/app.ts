import express from 'express'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route'
import bookmarkRoute from './routes/bookmark.route'
import whitelistRoute from './routes/whitelist.route'
import { Request, Response } from 'express'
const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/connect', (req: Request, res: Response) => {
    res.status(200).json({ message: "ok" })
})

app.use('/auth', authRoute)
app.use('/bookmark', bookmarkRoute)
app.use('/whitelist', whitelistRoute)

export default app
