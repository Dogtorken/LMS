let borrowedBooks = 0;
const borrowBooks = (req, res, next) => {
    if  (borrowedBooks == 3){
        return res.json('You can only borrow a maximum of 3 books!')
    }
    else{
        borrowedBooks++;
        next();
    }
}


module.exports = borrowBooks;