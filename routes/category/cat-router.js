const express = require('express');
const catModel = require('./cat-model');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { id } = req.params;
  try {
    const categories = await catModel.findCategories(id);
    if (categories) {
      res.status(200).json(categories);
    } else {
      res
        .status(404)
        .json({ message: '404 could not find user id with categories' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: 'server error finding category by user id' });
  }
});

router.get('/:catId', async (req, res, next) => {
  const { id, catId } = req.params;
  try {
    const category = await catModel.findCategoryById(id, catId);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'cannot find category item id' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: 'server error finding category by category id' });
  }
});

module.exports = router;
