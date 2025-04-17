const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyAdminToken = (req, res, next) => {
    const token = req.body.token;
   
    

    try {
        const result = jwt.verify(token, process.env.JWT_KEY);
        
        

        if (result.email !== "admin@gmail.com") {
            return res.status(401).json({ msg: "Access denied: Not an admin!" });
        }

        req.body.email = result.email;
       
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(401).json({ msg: "Session Expired!" });

        return res.status(401).json({ msg: "Unauthorized!" });
    }
};

module.exports = verifyAdminToken;
