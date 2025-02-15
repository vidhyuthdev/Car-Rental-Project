//Require
const express=require('express')
const app=express();
const authRouter=require('./routes/authRoutes')
const {sequelize}=require('./Models/Sequelize')
const verifyToken=require('./middleware/verifyToken')
const cors=require('cors');

//Middlewares
app.use(cors())
app.use(express.json())
app.use('/auth',authRouter);
app.use('/verify-token',verifyToken)
startApp=async()=>{
  try {    
    await sequelize.authenticate();
    console.log('Connected to DB!');    
    await sequelize.sync();    
  
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
    
} catch (error) {
    console.log('Failed to connect to the database:', error);
}
}
startApp();