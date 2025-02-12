const User=require('../Models/User');
const duplicateSignUpValidator=async(req,res,next)=>{
    const email=req.body.email
    try 
    {
        const currentUser = await User.findByPk(email);      
          if (currentUser) 
            {            
                console.log('User already exists!');
                return res.status(400).json({msg:'User with same email already exists!'});
            }
        next();
        
    } 
    catch (error) {
        return res.status(500).json({msg:"Internal Server Error!"})
        
    }
    
}
module.exports=duplicateSignUpValidator