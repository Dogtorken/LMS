const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { loginAuth } = require('./middleware/loginAuth')

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(loginAuth);


mongoose.connect(process.env.MONGO_URI)

app.listen(3000, console.log('server started.'))

