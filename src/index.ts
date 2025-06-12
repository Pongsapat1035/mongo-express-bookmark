import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path'
import app from "./app";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = process.env.PORT || 3000


app.listen(port, async () => {
    try {
        console.log(`Server is running on port ${port}`)
        await mongoose.connect((process.env.DB_URL ?? ''));
        console.log('mongoose is connected!')
    } catch (error) {
        console.log(error)
    }
}) 
