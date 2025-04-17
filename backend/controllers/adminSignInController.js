const { Admin } = require('../Models/User'); // assuming Admin is exported here
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminSignInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });


    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.hash);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    const token = jwt.sign({ email: admin.email, role: 'admin' }, process.env.JWT_KEY, { expiresIn: '1h' });

    return res.status(200).json({
      msg: 'Admin login successful',
      token,
      email: admin.email,
      name: admin.name,
    });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports =  adminSignInController ;
