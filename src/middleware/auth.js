const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ err: 'Validation failed' });
  }
};
