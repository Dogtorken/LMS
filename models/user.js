const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please enter your name']
    },
    email:{
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']

    },
    password:{
        type: String,
        require: [true, 'please enter a password'],
        minlength: [6, 'password must be a minimum of 6 characters']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if (user){
        const loggedIn = await bcrypt.compare(password, user.password);
        if (loggedIn){
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email');
}

userSchema.statics.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login')};


const User = mongoose.model('user', userSchema);

module.exports = User;