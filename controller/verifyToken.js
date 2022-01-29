const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    try{
		
        if(!token){
			return res.status(401).json({success: false, message: "No token provided."});
		}

        const decoded = jwt.verify(token, secret);
        req.body.username = decoded.username;
        
        next();

	}catch(err){
		return res.status(401).json({ success: false, message: "token error"});
	}
}

module.exports = {
    verifyToken
}