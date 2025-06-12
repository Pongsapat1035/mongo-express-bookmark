import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { Bookmark } from "../models/bookmart.schema";
import { validateCreateBookmark, allowedUpdateBookmarkField } from "../utils/bookmark.validator";
import { AppError } from "../utils/errors/appError";

export const createBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = validateCreateBookmark(req.body)
        const { title, url, description, tags } = validatedData
        const userId = req.user

        const bookmark = new Bookmark({
            userId,
            title,
            url,
            description,
            tags,
            isPublic: true
        })
        const response = await bookmark.save()
        res.json({ success: true, data: response })
    } catch (error) {
        next(error)
    }
}

export const getPublicBookmarks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, tags } = req.query
        const filter: any = { isPublic: true };
        if (tags) filter.tags = { $in: Array.isArray(tags) ? tags : [tags] };

        if (search) filter.title = { $regex: search, $options: 'i' };

        const bookmarks = await Bookmark.find(filter).populate("userId")
        res.status(200).json({ success: true, data: bookmarks })
    } catch (error) {
        next(error)
    }
}

export const getPublicBookmarkDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

        const bookmark = await Bookmark.findOne({ _id: id, isPublic: true }).populate("userId")
        if (!bookmark) throw new AppError("Not found", 404)

        res.json({ success: true, data: bookmark })
    } catch (error) {
        next(error)
    }
}

export const getMyBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user
        const bookmark = await Bookmark.find({ userId })
        res.json({ success: true, data: bookmark })
    } catch (error) {
        next(error)
    }
}

export const getMyBookmarkDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid id")

        const userId = req.user
        const bookmark = await Bookmark.find({ _id: id, userId })
        if (!bookmark) throw new AppError("Not found", 404)

        res.json({ data: bookmark })
    } catch (error) {
        next(error)
    }
}

export const updateBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid id")

        const bookmarkData = allowedUpdateBookmarkField(req.body)
        const response = await Bookmark.findByIdAndUpdate(id, bookmarkData, { new: true })
        res.json({ success: true, message: "Update bookmark success", updateField: bookmarkData, newBookmark: response })
    } catch (error) {
        next(error)
    }
}

export const deleteBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid id")

        const userId = req.user
        const response = await Bookmark.findByIdAndDelete({ _id: id, userId });
        if (!response) throw new AppError("Bookmark not found or not have permission")

        res.json({ success: true, message: "Delete book mark success ", data: response })
    } catch (error) {
        next(error)
    }
}

