const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const filterController=require('../controllers/filterController')
const filterSchemaValidator=require('../middleware/filterSchemaValidator')
const addBookingController=require('../controllers/addBookingController')
const checkExistingActiveBooking=require('../middleware/checkExistingActiveBooking')



router.post('/filter',verifyToken,filterSchemaValidator,filterController);
router.post('/book',verifyToken,checkExistingActiveBooking,addBookingController);


module.exports=router