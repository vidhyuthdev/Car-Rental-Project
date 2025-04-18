const {User}=require('../Models/User');
const bcrypt=require('bcrypt')
const saltRounds=13;
const jwt=require('jsonwebtoken')
require('dotenv').config();



const signIn= async (req, res) => {
    const {password}=req.body;
    const user=req.user;  
    try {
      const match = await bcrypt.compare(password, user.hash);    
      if (match) {
      
      const token=jwt.sign({email:user.email},process.env.JWT_KEY,{expiresIn:'1h'})
      return res.status(200).json({msg:'Login successful',token,email:user.email,name:user.name});
      } 
      else {
      
        return res.status(401).json({msg:'Invalid Credentials'});
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
      
    }
   
    
  };



  const signUp = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
       
        const hashOfPassword = await bcrypt.hash(password, saltRounds);

        
        const newUser = await User.create({
            name: name,
            email: email,
            mobile: mobile,
            hash: hashOfPassword,
        });

       
        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' });

        return res.status(200).json({ msg: 'User successfully created!', token,email,name });
    } 
    catch (err) {   
        return res.status(500).json({ msg: 'An error occurred while processing your request.' });
    }
};

module.exports={signIn,signUp}