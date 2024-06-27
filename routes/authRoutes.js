const { Router } = require('express');
const router = Router();
const authControllers = require('../controllers/authControllers');
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const borrowedBooks = require('../middleware/maxBorrowedBook');
const { loginAuth, logout } = require('../middleware/loginAuth');



router.get('/signup', authControllers.signup_get);
router.post('/signup', authControllers.signup_post);
router.get('/login', authControllers.login_get);
router.post('/login', authControllers.login_post);
router.get('/books/bookList', loginAuth, bookController.listBooks);
router.get('/books/add', loginAuth, bookController.addBook);
router.post('/books/add', loginAuth, bookController.addBook);
router.post('/books/borrow', loginAuth, borrowedBooks, authControllers.borrowBooks_post);
router.post('/books/borrow/return', loginAuth, userController.returnBook);
router.post('/logout', authControllers.logout)
//router.get('/query',);
//router.get('/signup',);

module.exports = router;