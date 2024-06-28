const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const loginAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
            if (err){
                console.log('could not verify token')
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.json({ 'message': 'you are not logged in.'})
    }
}

// const logout = (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/auth/login')};

module.exports = { loginAuth };