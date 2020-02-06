const express = require('express');
const catModel = require('./cat-model');
const authenticate = require('../../middleware/authenticate');
const router = express.Router({ mergeParams: true });

router.get('/', authenticate(), async (req, res, next) => {
  try {
    const categories = await catModel.categories();
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

router.get('/:userId', authenticate(), async (req, res) => {
  const { userId } = req.params;

  try {
    const category = await catModel.findCategory(userId);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'can not find user' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: 'server error with id for categories display' });
  }
});

router.get('/:userId/:catId', authenticate(), async (req, res, next) => {
  const { userId, catId } = req.params;
  try {
    const category = await catModel.findCategoryById(userId, catId);
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

/**
 * ! requires user_id in body to post.
 */
router.post('/', authenticate(), async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'category name is required' });
  }
  if (!req.body.users_id) {
    return res.status(400).json({ message: 'user_id missing but required' });
  }

  const category = {
    name: req.body.name,
    users_id: req.body.users_id,
  };
  try {
    const { users_id } = req.body;
    const catName = await catModel.insertCategory(category, users_id);
    res.status(201).json(catName);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'could not create category' });
  }
});

router.put('/:userId/:catId', authenticate(), async (req, res) => {
  const { userId, catId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: 'category name required to update' });
  }
  const updateCat = {
    name: name,
    users_id: userId,
  };
  try {
    const updateCategory = await catModel.updateCategory(
      updateCat,
      catId,
      userId
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'server error, updating category' });
  }
});

module.exports = router;
