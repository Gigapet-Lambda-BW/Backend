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

router.post('/', async (req, res) => {
  const { id } = req.params;
  if (!req.body.name) {
    return res.status(400).json({ message: 'category name is required' });
  }
  const category = {
    name: req.body.name,
    users_id: id,
  };
  try {
    const catName = await catModel.insertCategory(category, id);
    res.status(201).json(catName);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'could not create category' });
  }
});

router.put('/:catId', async (req, res) => {
  const { id, catId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: 'category name required to update' });
  }
  const updateCat = {
    name: name,
    users_id: id,
  };
  try {
    const updateCategory = await catModel.updateCategory(updateCat, catId, id);
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'server error, updating category' });
  }
});

module.exports = router;
