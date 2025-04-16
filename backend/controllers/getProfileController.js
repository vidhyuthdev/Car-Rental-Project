const { User, Bookings } = require('../Models/User');

const getProfileController = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Fetch user profile
    const user = await User.findByPk(email, {
      attributes: ['email', 'name', 'mobile'] 
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Count bookings for this user
    const count = await Bookings.count({
      where: { email }
    });

    // Return user profile + count
    return res.status(200).json({ ...user.toJSON(), count });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = getProfileController;
