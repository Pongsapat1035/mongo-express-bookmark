import express from 'express'
import { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'

import { errorHandler } from './middleware/errorHanler'
import authRoute from './routes/auth.route'
import bookmarkRoute from './routes/bookmark.route'
import whitelistRoute from './routes/whitelist.route'

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(express.json())
app.use(cookieParser())
app.use(limiter)

app.get('/connect', (req: Request, res: Response) => {
    res.status(200).json({ message: "ok" })
})

app.use('/auth', authRoute)
app.use('/bookmark', bookmarkRoute)
app.use('/whitelist', whitelistRoute)

app.use(errorHandler)

export default app
