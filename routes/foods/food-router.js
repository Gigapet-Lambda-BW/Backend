const express = require('express');
const foodModel = require('./foods-model');
const router = express.Router({ mergeParams: true });

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userFood = await foodModel.displayFoodsByUserId(userId);
    if (userFood) {
      res.status(200).json(userFood);
    } else {
      res.status(404).json({ message: 'cannot find foods for user' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: 'server error getting foods for user' });
  }
});

router.post('/', async (req, res) => {
  const { name, users_id } = req.params;
  if (!name) {
    res.status(400).json({ message: 'food insert requires a name' });
  }
  if (!users_id) {
    res.status(400).json({ message: 'food insert requires user' });
  }
  const foodPost = {
    name: name,
    users_id: users_id,
  };
  try {
    const food = await foodModel.insertFood(foodPost);
    res.status(201).json(food);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'server error inserting food post' });
  }
});

module.exports = router;
