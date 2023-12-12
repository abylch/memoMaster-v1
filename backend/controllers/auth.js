const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user');

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //const hashedPassword = await bcrypt.hash(password, 10);
    const user1 = new user({ username, email, password});
    console.log(user1)
    await user1.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user1 = await user.findOne({ email });
    console.log("user1 from auth.js controller: ", user1)
    if (!user1) {
      return res.status(404).json({ message: 'User not found' });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const passwordMatch = await user1.comparePassword(password);
    const passwordMatch = await bcrypt.compare(password, user1.password);
    console.log("password to compare: ",password, user1.password)
    console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user1._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });

    const userId = user1._id;
    res.json({ token, userId});
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };