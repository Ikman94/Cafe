const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d'
        }
    );
}; 

// const isAdmin = (req, res, next) => {
//     if(req.user && req.user.isAdmin){
//         next();
//     }else{
//         res.status(401).send({ message: 'Invalid Admin Token' });
//     }
// }

module.exports = generateToken ;
// module.exports = isAdmin;