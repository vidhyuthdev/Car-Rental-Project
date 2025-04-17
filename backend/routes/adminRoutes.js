const express=require('express')
const router=express.Router()
const verifyAdminToken=require('../middleware/verifyAdminToken')
const getUnapprovedBookingsController=require('../controllers/getUnapprovedBookingsController')
const updateBookingStatusController=require('../controllers/updateBookingStatusController')
const getCarDetailsController=require('../controllers/getCarDetailsController')
const editCarController=require('../controllers/editCarController')
const verifyCarSchema=require('../middleware/verifyCarSchema')
const addCarController=require('../controllers/addCarController')


router.post('/unapproved-bookings',verifyAdminToken,getUnapprovedBookingsController);
router.post('/update-booking-status',verifyAdminToken,updateBookingStatusController);
router.post('/get-car-details',verifyAdminToken,getCarDetailsController);
router.post('/edit-car',verifyAdminToken,editCarController)
router.post('/add-car',verifyAdminToken,verifyCarSchema,addCarController)


module.exports=router;