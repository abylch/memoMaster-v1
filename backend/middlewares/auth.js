const jwt = require('jsonwebtoken');
const user = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decodedToken: ", decodedToken);
    console.log("decodedToken.userId: ", decodedToken.userId);
    const userId = decodedToken.userId;
    const user1 = await user.findById(userId);
    console.log("user from db by id using token: ", user1);

    if (!user1) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user1;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };