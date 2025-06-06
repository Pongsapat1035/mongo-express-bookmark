import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

declare global {
    namespace Express {
        interface Request {
            user?: string | object;
        }
    }
}

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const jwt_secret = (process.env.JWT_SECRET || "secret")

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies
        if (!token) throw new Error("Token not found")

        const response = jwt.verify(token, jwt_secret)
        req.user = response.sub
        next()
    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(401).json({ message: error.message })
    }
}