const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]; //get the second string we have bear and token
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;
        req.auth = { userId };

        if (req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        }else {
            next();
        }
    }catch (error) {
      res.status(401).js({error: error | 'Invalid request !'});
    }
};
