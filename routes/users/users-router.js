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
    console.log(err); // ! rm for production
    next(err);
  }
});

module.exports = router;
