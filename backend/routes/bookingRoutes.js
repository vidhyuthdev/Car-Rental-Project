const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const filterController=require('../controllers/filterController')
const filterSchemaValidator=require('../middleware/filterSchemaValidator')
const addBookingController=require('../controllers/addBookingController')
const checkExistingActiveBooking=require('../middleware/checkExistingActiveBooking')
const getBookingsController=require('../controllers/getBookingsController')
const cancelBookingController=require('../controllers/cancelBookingController')

router.post('/filter',verifyToken,filterSchemaValidator,filterController);
router.post('/book',verifyToken,checkExistingActiveBooking,addBookingController);
router.post('/get-bookings',verifyToken,getBookingsController);
router.post('/cancel',verifyToken,cancelBookingController)


module.exports=router