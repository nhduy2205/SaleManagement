const jwt =  require('jsonwebtoken');
const config = require('config')

module.exports = function(req, res, next){
    // Get token from header
    const token = req.header('x-auth-token');


    // Check if not token
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // console.log(decoded)
        req.user = decoded.user;
        if(req.user.role !== 'admin'){
            return res.status(401).json({msg: 'You are not authorized to access'})
        }
        else{
            // console.log(decoded.user)
            next();
        }
        
       
        
    }
    catch(err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}