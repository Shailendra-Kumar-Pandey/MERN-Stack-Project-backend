var jwt = require('jsonwebtoken');
const JWT_SECRET="kya haa hai";


const fetchuser = (req, res, next)=>{
    // get the user form the jwt token and add id to request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'please authanticate using a void token'});
    }
    try {
     const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;  
    next() 
    } catch (error) {
        res.status(401).send({error: 'please authanticate using a void token'});
    }
}

module.exports = fetchuser;