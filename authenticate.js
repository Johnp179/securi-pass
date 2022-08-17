const jwt = require('jsonwebtoken');


function authenticate(req, res, next){
    jwt.verify(req.cookies.token, process.env.SECRET, (error, user)=>{
        if(error){
            return res.status(403).end()
        } 
        
        req.user = user
        next()
    });
   
        
}

module.exports = authenticate