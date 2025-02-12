const User=require('../Models/User')
const duplicateSignUpValidator=async(req,res,next)=>{
    const email=req.body.email;
    try 
    {
        const currentUser = await User.findByPk(email);      
          if (!currentUser) 
            {            
                console.log("User doesn't exist!");
                return res.status(400).json({msg:'User with this email does not exist!'});
            }
        next();
        
    } 
    catch (error) {
        return res.status(500).json({msg:"Internal Server Error!"})
        
    }
    
}
module.exports=duplicateSignUpValidator