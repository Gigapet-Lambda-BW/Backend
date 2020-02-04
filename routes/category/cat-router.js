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
    console.log(err);
    next(err);
  }
});

module.exports = router;
