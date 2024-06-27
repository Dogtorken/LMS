const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
//const borrowedBooks = require('./middleware/maxBorrowedBook');
const { loginAuth } = require('./middleware/loginAuth')

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
//app.use(borrowedBooks);
app.use(loginAuth);

const dbURI = 'mongodb://localhost:27017/LMS';
//mongoose.connect(process.env.MONGO_URI)

app.listen(3000, console.log('server started.'))

