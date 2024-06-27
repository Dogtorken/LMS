const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    // isbn:{
    //     type: String,
    //     required: true,
    //     //unique: true
    // },
    // id:{
    //     type: Number,
    //     required: true
    // },
    // bookId: {
    //     type: String,
    //     default: uuidv4,
    // }
})

const Books = mongoose.model('book', bookSchema);
module.exports = Books;