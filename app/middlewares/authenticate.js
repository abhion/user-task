const verify = require('jsonwebtoken').verify;
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname + '/../security/private.pem'));

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth');
    if (!token) {
        res.json({ errMessage: 'Invalid token' });
    }else{

        try {
            const tokenData = verify(token, privateKey);
            req.user = { name: tokenData.name, email: tokenData.email, _id: tokenData._id }
            next();
    
        } catch (error) {
            res.status(401);
             res.json({ errMessage: 'Invalid token', error });
             return
        }
    }
}

module.exports = authenticateUser;