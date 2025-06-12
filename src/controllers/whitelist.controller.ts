import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"

import { User } from "../models/user.schema"
import { AppError } from "../utils/errors/appError"

export const getAllWhitelists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user
        const result = await User.findById(userId).populate('whitelist')
        if (!result) throw new AppError('Bookmark not found', 404)

        const { whitelist } = result
        res.json({ success: true, data: whitelist })
    } catch (error) {
        next(error)
    }
}

export const addToWhitelist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookmarkId } = req.body
        const userId = req.user
        if (!mongoose.Types.ObjectId.isValid(bookmarkId)) throw new AppError("Invalid id")

        const response = await User.findByIdAndUpdate(userId, {
            $addToSet: { whitelist: bookmarkId }
        }, { new: true });

        if (!response) throw new AppError('User not found', 404);

        res.status(200).json({ success: true, message: 'Bookmark saved to whitelist (if not already).', whitelist: response });

    } catch (error) {
        next(error)
    }
}

export const removeWhitelist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookmarkId } = req.params
        if (!mongoose.Types.ObjectId.isValid(bookmarkId)) throw new AppError("Invalid id")

        const userId = req.user
        const response = await User.findByIdAndUpdate(userId, {
            $pull: { whitelist: bookmarkId }
        });
        if (!response) throw new AppError("bookmark not found", 404)

        res.json({ success: true, bookmarkId, message: "Delete bookmark success" })
    } catch (error) {
        next(error)
    }
}