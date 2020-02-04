const express = require('express');
const foodModel = require('./foods-model');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { id } = req.params;
  try {
    const userFood = await foodModel.displayFoodsByUserId(id);
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

//!! router.post('/foodId', async (req, res) => {});

module.exports = router;
