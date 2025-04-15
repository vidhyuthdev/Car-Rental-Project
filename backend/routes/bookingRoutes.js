const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const filterController=require('../controllers/filterController')
const filterSchemaValidator=require('../middleware/filterSchemaValidator')


router.post('/filter',verifyToken,filterSchemaValidator,filterController);



module.exports=router