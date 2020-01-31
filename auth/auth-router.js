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
    const saved = await authModel.add(saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ errorMessage: 'server error registering user' });
  }
});
