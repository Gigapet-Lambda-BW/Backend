const db = require('../data/db-config');
const petModel = require('./pet-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('cat-model suite', () => {
  test('find all', async () => {
    const res = await petModel.findCategories(1);

    expect(res).toHaveLength(2);
  });
});
