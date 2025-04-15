const {Cars}=require('../Models/User');


const filterController=async(req,res,next)=>{    
    const {location,startDate,endDate,type}=req.body.parameters;
    try {
        let cars;
        if(type!='*')
        {
            cars=await Cars.findAll({attributes:['model','location','type','price','imageURL','id'],where:{
                location:location,
                type:type
            }})
        }
        else
        {
            cars=await Cars.findAll({attributes:['model','location','type','price','imageURL','id'],where:{
                location:location,
               
            }})
        }       
        return res.status(200).json({msg:"DONE",cars:cars})        
    } catch (error) {
        return res.status(400).json({msg:"Internal Error"});
        
    }
}

module.exports=filterController
