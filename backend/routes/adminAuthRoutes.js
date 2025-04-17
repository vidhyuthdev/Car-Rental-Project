const express=require('express')
const router=express.Router()
const authSchemaValidator=require('../middleware/authSchemaValidator')
const adminSignInController=require('../controllers/adminSignInController');
const verifyAdminToken = require('../middleware/verifyAdminToken');


router.post('/signin',authSchemaValidator.validateEmail,adminSignInController);
router.post('/verify-token',verifyAdminToken,(req,res)=>{return res.status(200).json({msg:'Ok'})})

module.exports=router