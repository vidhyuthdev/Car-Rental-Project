const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config();


const verifyToken=(req,res,next)=>{   
    
    const token=req.body.token;
    
    
    try {
        const result=jwt.verify(token,process.env.JWT_KEY);            
    

        next();
        
    } catch (error) {      
        if(error.name==='TokenExpiredError')
        return res.status(401).json({msg:"Session Expired!"})
        return res.status(401).json({msg:"Unauthorized!"})
    }
}
module.exports=verifyToken