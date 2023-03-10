import mongoose from "mongoose";

mongoose.connect('mongodb+srv://eliasbragga:123@cluster0.vh2c5ei.mongodb.net/todo')

let db = mongoose.connection

export default db