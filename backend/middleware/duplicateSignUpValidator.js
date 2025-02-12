const User=require('../Models/User');
const duplicateSignUpValidator=async(req,res,next)=>{
    const email=req.body.email
    try 
    {
        const currentUser = await User.findByPk(email);      
          if (currentUser) 
            {            
                
                return res.status(409).json({msg:'User with same email already exists!'});
            }
        next();
        
    } 
    catch (error) {
        return res.status(500).json({msg:"Internal Server Error!"})
        
    }
    
}
module.exports=duplicateSignUpValidator