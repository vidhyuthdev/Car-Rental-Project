const { Cars } = require('../Models/User');  


const getCarDetailsController = async (req, res) => {
    try {
        
        const cars = await Cars.findAll();
        console.log(cars);
        

        return res.status(200).json(cars);
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = getCarDetailsController ;
