const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      jwt.verify(token, secrets.jwt);

      next();
    } catch (err) {
      console.log('testing middleware err ', err);
      res.status(401).json({ message: 'Sorry but invalid credentials' });
    }
  };
};
