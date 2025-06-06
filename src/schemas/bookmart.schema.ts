import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    title: String,
    url: String,
    description: String,
    tags: [String],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    isPublic: Boolean,
    createdAt: { type: Date, default: Date.now }
})

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);