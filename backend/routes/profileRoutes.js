const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const getProfileController=require('../controllers/getProfileController')
const updateProfileController=require('../controllers/updateProfileController')



router.post('/get-profile',verifyToken,getProfileController)
router.post('/update-profile',verifyToken,updateProfileController)


module.exports=router