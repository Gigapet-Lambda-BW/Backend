const foodModel = require('./foods-model');
const db = require('../../data/db-config');

beforeEach(async () => {
  await db.seed.run();
});

describe('foods models', () => {
  test('displayAllFoods', async () => {
    const res = await foodModel.displayAllFoods();

    expect(res.length).toBeGreaterThan(4);
  });

  test('displayFoodsByUserId all foods for user', async () => {
    const res = await foodModel.displayFoodsByUserId(1);
    expect(res.length).toBe(3);
  });

  test('foodById', async () => {
    const res = await foodModel.foodById(4);
    expect(res.name).toMatch(/bread/i);
  });

  test('updateFood', async () => {
    await foodModel.updateFood(
      { name: 'candy', users_id: 1, categories_id: 6 },
      5
    );
    const res = await foodModel.foodById(5);
    expect(res.name).toBe('candy');
  });
});
