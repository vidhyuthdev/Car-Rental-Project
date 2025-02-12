const User=require('../Models/User');
const bcrypt=require('bcrypt')
const saltRounds=10;



const signIn= async (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;
  
   
    const currentUser = await User.findByPk(email);
    
    if (!currentUser) {
      console.log('No user found:', email);
      return res.status(404).json({msg:'User not found'}); 
    }
  
    
    const match = await bcrypt.compare(pwd, currentUser.hash); 

    if (match) {
      console.log('Password verified successfully!');
      return res.json({msg:'Login successful',flag:true});
    } else {
      console.log('Password does not match');
      return res.status(401).json({msg:'Invalid password',flag:false});
    }
  };



const signUp=async (req, res) => {
    const { email, password } = req.body;
  
    try {
               
      const hashOfPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = await User.create({
        email: email,
        hash: hashOfPassword,
      });
  
      console.log('New user created:');
      
      
      return res.status(201).json({msg:'User successfully created!',flag:true});
    } catch (err) {
      console.error('Error during signup:', err);
      
      return res.status(500).json({msg:'An error occurred while processing your request.',flag:false});
    }
  }
module.exports={signIn,signUp}