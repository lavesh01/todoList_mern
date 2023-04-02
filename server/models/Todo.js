const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    list: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false,
        required: true
    },
    position: {
        type: Number,
        required: true,
    }
})

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo; 