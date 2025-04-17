

const {Cars} = require('../Models/User'); 

const editCarController = async (req, res) => {
    try {
        const { car } = req.body;
        const { id, imageURL, price } = car;
    
        if (!id || !imageURL || !price || Number(price) <= 0) {
          return res.status(400).json({ error: 'Invalid car data provided' });
        }
    
        const carToUpdate = await Cars.findByPk(id);
        if (!carToUpdate) {
          return res.status(404).json({ error: 'Car not found' });
        }
    
        carToUpdate.imageURL = imageURL;
        carToUpdate.price = price;
    
        await carToUpdate.save();
    
        res.status(200).json({ message: 'Car updated successfully', car: carToUpdate });
      } catch (err) {
        console.error('Error updating car:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports = editCarController;
