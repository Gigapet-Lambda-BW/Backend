const express = require('express');
const catRouter = require('../routes/category/cat-router');
const foodRouter = require('../routes/foods/food-router');
const router = express.Router({ mergeParams: true });

router.use('/category', catRouter);
router.use('/foods', foodRouter);

module.exports = router;
