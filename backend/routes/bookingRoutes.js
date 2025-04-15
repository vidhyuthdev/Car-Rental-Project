const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const filterController=require('../controllers/filterController')
const filterSchemaValidator=require('../middleware/filterSchemaValidator')
const addBookingController=require('../controllers/addBookingController')

router.post('/filter',verifyToken,filterSchemaValidator,filterController);
// router.post('/book',verifyToken,(req,res)=>{console.log(req.body);res.status(200).send({msg:"YUO"})})

router.post('/book',verifyToken,addBookingController);


module.exports=router