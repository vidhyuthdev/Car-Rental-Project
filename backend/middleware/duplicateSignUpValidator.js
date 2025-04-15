const {User}=require('../Models/User');
const duplicateSignUpValidator=async(req,res,next)=>{
    const email=req.body.email;
    const mobile=req.body.mobile;
    try 
    {
        const currentUser = await User.findByPk(email);      
          if (currentUser) 
            {            
                
                return res.status(409).json({msg:'Account with email already exists'});
            }
        const userWithSameMobile=await User.findOne({where:{mobile:mobile}})
        if(userWithSameMobile)
            return res.status(409).json({msg:'Account with phone already exists'});
        next();
        
    } 
    catch (error) {
        return res.status(500).json({msg:"Internal Server Error!"})
        
    }
    
}
module.exports=duplicateSignUpValidator