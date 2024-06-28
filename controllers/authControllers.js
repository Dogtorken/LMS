const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//error handling
const handleErrors = (err) => {
    let errors = { name: '', email: '', password: ''};

    //duplicate email
    if (err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }
    
    //validate errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const maxAge = 10 * 60;
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.send('sign up page')
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password, role } = req.body;
    try{
        const user = await User.create({name, email, password, role})
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.login_get = (req, res) => {
    res.send('login page')
}

module.exports.login_post = async (req, res) => {
    const { email, password, role } = req.body;
    
    try {
        const user = await User.login(email, password, role);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id });
    } 
    catch (err) {
        res.status(400).json({ })
    }
}

// module.exports.allBooks_get = (req, res) => {
//     res.send('List of all books')
// }

module.exports.borrowBooks_post = (req, res) => {
    res.send('you borrowed this book')
}

// module.exports.returnBooks_post = (req, res) => {
//     res.send('You have returned the book')
// }

// module.exports.addBooks_get = (req, res) => {
// res.send('add new book page')
// }

// module.exports.addBooks_post = (req, res) => {
//     res.send('new book added successfully')
// }

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.send('You have logged out')
    //res.redirect('/auth/login');
}