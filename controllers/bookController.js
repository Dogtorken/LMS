const Book = require('../models/book');
const User = require('../models/user');

exports.addBook = async (req, res) => {
    const { title, author, isbn } = req.body;
    try {
        const book = await Book.create({ title, author, isbn });
        res.status(201).json({ book })
        // res.redirect('/books');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.redirect('/books');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        res.render('books/bookDetails', { book });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.listBooks = async (req, res) => {
    try {
        const books = await Book.find();
        const user = req.user
        //res.render('books/bookList', { books, user });
        res.status(200).send('List of books')
    } catch (err) {
        res.status(400).send(err.message);
    }
};
