import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    id: {type: String},
    todo: {type: String, required: true},
    isDone: {type: Boolean},
    priority: {type: Boolean},

})

formSchema.statics.getAll = async function() {
    return this.find();
}

const form = mongoose.model("todos", formSchema)

export default form