const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const authModel = require('./auth-model');

router.post('/register', async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ message: 'username is required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'password is required' });
  }
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const saved = await authModel.add(user);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ errorMessage: 'server error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await authModel.findBy({ username }).first();

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (user && passwordCheck) {
      const token = jwt.sign(
        {
          subject: user.id,
          username: user.username,
        },
        secrets.jwt,
        {
          expiresIn: '5d',
        }
      );

      res
        .status(200)
        .json({ token: token, message: `greetings ${user.username}` });
    } else {
      res.status(401).json({ message: 'invalid user credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'login server error' });
  }
});

module.exports = router;
