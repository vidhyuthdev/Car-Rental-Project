const { User } = require('../Models/User');
const { phoneSchema, nameSchema } = require('../Models/authSchema');

const updateProfileController = async (req, res, next) => {
  try {
    // Validate name (only letters and spaces)
    const { error: nameError } = nameSchema.validate({ name: req.body.name });
    if (nameError) {
      return res.status(400).json({ msg: nameError.details[0].message });
    }

    // Validate phone using Joi
    const { error: phoneError } = phoneSchema.validate({ mobile: req.body.mobile });
    if (phoneError) {
      return res.status(400).json({ msg: phoneError.details[0].message });
    }

    // Find the user by email (should be from token or a secure source)
    const user = await User.findByPk(req.body.email);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user profile
    user.name = req.body.name;
    user.mobile = req.body.mobile;

    await user.save();

    // Return success response
    return res.status(200).json({
      msg: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = updateProfileController;
