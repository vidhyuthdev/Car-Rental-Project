const User=require('../Models/User')
const userExistsValidator=async(req,res,next)=>{
    const email=req.body.email;
    try 
    {
        const currentUser = await User.findByPk(email);      
          if (!currentUser) 
            {            
      
                return res.status(404).json({msg:'User does not exist'});
            }
            req.user=currentUser
        next();
        
    } 
    catch (error) {
        return res.status(500).json({msg:"Internal Server Error!"})
        
    }
    
}
module.exports=userExistsValidator