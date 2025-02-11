const express=require('express')
const app=express();
const {Sequelize,DataTypes}=require('sequelize')
const dotenv=require('dotenv').config()
const bcrypt=require('bcrypt')
const sequelize = new Sequelize(process.env.DB_URI);
const saltRounds=10;

const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true, 
      allowNull: false,
      validate: {
        isEmail: true  
      }
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,  
    }
  }, {
    tableName: 'Users',
    timestamps: false 
  });



app.use(express.json())

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const currentUser = await User.findByPk(email);
  
      if (currentUser) {
        
        console.log('User already exists!');
        return res.status(400).send('User already exists!');
      }
  
      
      const hashOfPassword = await bcrypt.hash(password, saltRounds);
  
  
      const newUser = await User.create({
        email: email,
        hash: hashOfPassword,
      });
  
      console.log('New user created:', newUser);
      
      
      return res.status(201).send('User successfully created!');
    } catch (err) {
      console.error('Error during signup:', err);
      
      return res.status(500).send('An error occurred while processing your request.');
    }
  });
  
app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;
  
   
    const currentUser = await User.findByPk(email);
    
    if (!currentUser) {
      console.log('No user found:', email);
      return res.status(404).send('User not found'); 
    }
  
    
    const match = await bcrypt.compare(pwd, currentUser.dataValues.hash); 

    if (match) {
      console.log('Password verified successfully!');
      return res.send('Login successful');
    } else {
      console.log('Password does not match');
      return res.status(401).send('Invalid password');
    }
  });
  






app.listen(5000,async()=>{
    try {
        await sequelize.authenticate();
        await User.sync();
        console.log('SYNCED')
        console.log('COnnected to DB!!!!!');
        
    } catch (error) {
        console.log('Not connected!!!!');
        
    }
    
    
})