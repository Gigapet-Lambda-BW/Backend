const db = require('../data/db-config');
const petModel = require('./pet-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('categories calls', () => {
  test('find all', async () => {
    const res = await petModel.findCategories(1);
    expect(res).toHaveLength(2);
  });

  test('find specific category item', async () => {
    const res = await petModel.findCategoryById(1, 1);
    expect(res).toEqual({ username: 'harry', name: 'vegetables' });
  });
});
