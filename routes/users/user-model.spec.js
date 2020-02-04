const db = require('../../data/db-config');
const usersModel = require('./users-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('users models', () => {
  test('get all users', async () => {
    const res = await usersModel.getUsers();
    expect(res.length).toBeGreaterThan(0);
  });

  test('get user by id', async () => {
    const res = await usersModel.getUserById(2);
    expect(res.username).toMatch(/jared/i);
  });
});
