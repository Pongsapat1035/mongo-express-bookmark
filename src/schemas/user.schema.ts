import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    whitelist: [{ type: Schema.Types.ObjectId, ref: "Bookmark" }],
    createdDate: { type: Date, default: Date.now },
})

export const User = mongoose.model("User", userSchema);