import { Response, Request } from "express";
import { validateRegister, validateLogin } from "../utils/validation";
import { z } from 'zod'
import { User } from "../schemas/user.schema";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const jwt_secret = (process.env.JWT_SECRET || 'secret')

export const registerHanler = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        validateRegister(userData)
        const { email, password, name } = userData

        const existingUser = await User.findOne({ email })
        if (existingUser) throw new Error("user is already exist")

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email, password: hashedPassword, name
        })

        await user.save()
        const token = jwt.sign({ email, sub: user._id }, jwt_secret)
        res.json({ message: "Register success", token })
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error.issues)
            res.status(400).json({ message: error.issues })
            return
        }
        if (error instanceof Error) {
            console.log(error.message)
            res.status(400).json({ message: error.message })
            return
        }
    }
}

export const loginHanler = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        validateLogin(userData)

        const { email, password } = userData
        const existingUser = await User.findOne({ email })
        if (!existingUser) throw new Error("User not found")

        const hashedPassword = (existingUser.password ?? '')
        const checkPassword = await bcrypt.compare(password, hashedPassword)
        if (!checkPassword) throw new Error("Password is incorrect")

        const token = jwt.sign({ email, sub: existingUser._id }, jwt_secret)

        res.json({ message: "Login success !", token })
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error.issues)
            res.status(400).json({ message: error.issues })
            return
        }
        if (error instanceof Error) {
            console.log(error.message)
            res.status(400).json({ message: error.message })
            return
        }
    }
}


