import { Response, Request, NextFunction } from "express";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

import { validateRegister, validateLogin } from "../utils/auth.validator";
import { User } from "../models/user.schema";
import { AppError } from "../utils/errors/appError";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const jwt_secret = (process.env.JWT_SECRET || 'secret')

export const registerHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = validateRegister(req.body)
        const { email, password, name } = validatedData

        const existingUser = await User.findOne({ email })
        if (existingUser) throw new AppError("user is already exist", 400)

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email, password: hashedPassword, name, whitelist: []
        })

        await user.save()
        const token = jwt.sign({ email, sub: user._id }, jwt_secret, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, message: "Register success" })
    } catch (error) {
        next(error)
    }
}

export const loginHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = validateLogin(req.body)

        const { email, password } = validatedData
        const existingUser = await User.findOne({ email })
        if (!existingUser) throw new AppError("User not found", 404)

        const hashedPassword = (existingUser.password ?? '')
        const checkPassword = await bcrypt.compare(password, hashedPassword)
        if (!checkPassword) throw new AppError("Password is incorrect")

        const token = jwt.sign({ email, sub: existingUser._id }, jwt_secret, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, message: "Login success !" })
    } catch (error) {
        next(error)
    }
}

export const getUserHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user
        const user = await User.findById(userId)
        if (!user) throw new AppError("User not found", 404)

        const userData = {
            email: user.email,
            name: user.name,
            whitelist: user.whitelist
        }

        res.json({ success: true, user: userData })
    } catch (error) {
        next(error)
    }
}
