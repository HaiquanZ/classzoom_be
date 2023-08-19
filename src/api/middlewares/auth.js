const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authorize = function (req, res, next) {
    try{
        const authorizationHeader = req.headers.token;
        if (!authorizationHeader) throw new Error('Unauthorized');

        const token = authorizationHeader.split(' ')[1];

        return jwt.verify(token, JWT_SECRET, function(err, data){
            if(err) throw new Error('Authorize Failed');
            req.user = data;
            next();
        })
    }catch(err){
        return res.status(401).json({
            message: err.message,
        })
    }
}

module.exports = authorize;