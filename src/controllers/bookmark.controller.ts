import { Request, Response } from "express";
import { Bookmark } from "../schemas/bookmart.schema";
import { validateCreateBookmark, allowedUpdateBookmarkField } from "../utils/validation";
import { getAllowedField } from "../utils/bookmark";
import { z } from 'zod'
import mongoose from "mongoose";

export const createBookmark = async (req: Request, res: Response) => {
    try {
        const bookmarkData = req.body
        validateCreateBookmark(bookmarkData)
        const { title, url, description, tags } = bookmarkData
        const userId = req.user
        // console.log(user)
        const bookmark = new Bookmark({
            userId,
            title,
            url,
            description,
            tags,
            isPublic: true
        })
        const response = await bookmark.save()
        res.json({ data: response })
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

export const getPublicBookmarks = async (req: Request, res: Response) => {
    try {
        const bookmarks = await Bookmark.find({ isPublic: true }).populate("userId")
        res.status(200).json({ data: bookmarks })
    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(400).json({ message: error.message })
    }
}

export const getPublicBookmarkDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

        const bookmark = await Bookmark.findOne({ _id: id, isPublic: true }).populate("userId")
        if (!bookmark) throw new Error("Not found")

        res.json({ data: bookmark })
    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(400).json({ message: error.message })
    }
}

export const getMyBookmark = async (req: Request, res: Response) => {
    try {
        const userId = req.user
        const bookmark = await Bookmark.find({ userId })
        res.json({ data: bookmark })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) res.status(400).json({ message: error.message })
    }
}

export const getMyBookmarkDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

        const userId = req.user
        const bookmark = await Bookmark.find({ _id: id, userId })
        if (!bookmark) throw new Error("Not found")

        res.json({ data: bookmark })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) res.status(400).json({ message: error.message })
    }
}

export const updateBookmark = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

        const bookmarkData = allowedUpdateBookmarkField(req.body)
        res.json({ bookmarkData })
    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            console.log(error.issues)
            res.status(400).json({ message: error.issues })
            return
        }
        if (error instanceof Error) res.status(400).json({ message: error.message })
    }
}

export const deleteBookmark = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = req.user
        const response = await Bookmark.deleteOne({ _id: id, userId });
        const { deletedCount } = response
        if (deletedCount === 0) throw new Error("Bookmark not found or not have permission")

        res.json({ message: "Delete book mark success ", data: response })
    } catch (error) {
        console.log(error)
        if (error instanceof Error)
            res.status(error.message.includes('not found') ? 404 : 400).json({ message: error.message })

    }
}

