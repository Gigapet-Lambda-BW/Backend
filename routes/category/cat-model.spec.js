const db = require('../../data/db-config');
const catModel = require('./cat-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('categories calls', () => {
  test('find all', async () => {
    const res = await catModel.findCategories(1);
    expect(res).toHaveLength(2);
  });

  test('find specific category item', async () => {
    const res = await catModel.findCategoryById(1, 1);
    expect(res).toEqual({ username: 'harry', name: 'vegetables' });
  });

  test('update category', async () => {
    await catModel.updateCategory({ name: 'candy', users_id: 1 }, 1, 7);
    const data = await catModel.findCategoryById(1, 1);
    expect(data.name).toMatch(/candy/i);
  });

  // test('insert Category', async () => {
  //   await petModel.insertCategory(
  //     {
  //       name: 'junk food',
  //       users_id: 1,
  //     },
  //     1
  //   );
  //   const data = await catModel.findCategoryById(1, 7);

  //   expect(data.name).toBe('junk food');
  // });

  // ! FK constraint will not let this occur.
  // test('delete category', async () => {
  //   await catModel.deleteCategory(1);
  //   const res = await findCategories(1);

  //   expect(res.length).toHaveLength(1);
  // });
});
