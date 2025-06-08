import { Request, Response } from "express"
import { User } from "../schemas/user.schema"
import mongoose from "mongoose"

export const getAllWhitelists = async (req: Request, res: Response) => {
    try {
        const userId = req.user
        const result = await User.findById(userId).populate('whitelist')
        if (!result) throw new Error('Not found')

        const { whitelist } = result
        res.json({ data: whitelist })
    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(400).json({ message: error.message })
    }
}
export const addToWhitelist = async (req: Request, res: Response) => {
    try {
        const { bookmarkId } = req.body
        const userId = req.user
        if (!mongoose.Types.ObjectId.isValid(bookmarkId)) throw new Error("Invalid id")

        const response = await User.findByIdAndUpdate(userId, {
            $addToSet: { whitelist: bookmarkId }
        }, { new: true });

        if (!response) throw new Error('User not found');

        res.status(200).json({ message: 'Bookmark saved to whitelist (if not already).', whitelist: response });

    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(400).json({ message: error.message })
    }
}
export const removeWhitelist = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = req.user
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

        const response = await User.findByIdAndUpdate(userId, {
            $pull: { whitelist: id }
        });
        if (!response) throw new Error("bookmark not found")

        res.json({ id, message: "Delete bookmark success" })
    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(400).json({ message: error.message })
    }
}