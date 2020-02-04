const express = require('express');
const userModel = require('./users-model');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'no user by id' });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { username, password } = req.body;
  const { id } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'username required for update' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password required for update' });
  }
  const updateUser = {
    username: username,
    password: password,
  };
  try {
    const data = await userModel.updateUser(updateUser, id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
