const express = require('express');
const foodModel = require('./foods-model');
const router = express.Router({ mergeParams: true });
const authenticate = require('../../middleware/authenticate');

router.get('/:userId', authenticate(), async (req, res) => {
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

//!! requires category in drop down to call it.
//!! requires user to be picked for them or they pick them and put in POST
router.post('/', authenticate(), async (req, res) => {
  const { name, users_id, categories_id } = req.body;
  if (!name) {
    res.status(400).json({ message: 'food insert requires a name' });
  }
  if (!users_id) {
    res.status(400).json({ message: 'food insert requires user' });
  }
  if (!categories_id) {
    return res.status(400).json({ message: 'category for insert required' });
  }
  const foodPost = {
    name: name,
    users_id: users_id,
    categories_id: categories_id,
  };
  try {
    const food = await foodModel.insertFood(foodPost);
    res.status(201).json(food);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'server error inserting food post' });
  }
});
//!! requires users_id and categories_id for update to be inputted.
//!! use  `/category/:id` to find users_id, category_id
router.put('/:foodId', authenticate(), async (req, res) => {
  const { foodId } = req.params;
  const { name, users_id, categories_id } = req.body;
  if (!foodId) {
    return res.status(404).json({ message: '404 food not found for update' });
  }
  const updateFood = {
    name: name,
    users_id: users_id,
    categories_id: categories_id,
  };
  try {
    const food = await foodModel.updateFood(updateFood, foodId);
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: 'food id not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'server error for food' });
  }
});

router.delete('/:foodId', authenticate(), async (req, res) => {
  const { foodId } = req.params;
  try {
    await foodModel.deleteFood(foodId);
    res.status(204).json({ message: 'food deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'server error deleting food' });
  }
});

module.exports = router;
