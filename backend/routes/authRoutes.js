const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')
const authSchemaValidator=require('../middleware/authSchemaValidator')
const duplicateSignUpValidator=require('../middleware/duplicateSignUpValidator')
const userExistsValidator=require('../middleware/userExistsValidator')



router.post('/signin',authSchemaValidator.validateEmail,userExistsValidator,authController.signIn)
router.post('/signup',authSchemaValidator.validateEmail,authSchemaValidator.validatePassword,duplicateSignUpValidator,authController.signUp)

module.exports=router