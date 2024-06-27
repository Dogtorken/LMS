const User = require('../models/user');
const Book = require('../models/book');

exports.blockUser = async (req, res) => {
    const { _id } = req.params;
    try {
        await User.findByIdAndUpdate(_id, { blocked: true });
        res.redirect('/users');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// exports.borrowBook = async (req, res) => {
//     const { _id } = req.body;
//     const userId = req.User(_id);
//     try {
        
//         const user = await User.findById(userId);
//         if (user.borrowedBooks.length == 3) {
//         return res.status(400).send('Maximum limit of borrowed books reached');
//         }
//         user.borrowedBooks.push(_id);
//         await user.save();
//         res.status(200).send(`You have borrowed the book with ID: {_id}`)
//         //res.redirect('/users');
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// };

exports.returnBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        user.borrowedBooks.pull(bookId);
        await user.save();
        res.redirect('/users');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// exports.listUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.render('users/userList', { users });
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// };

