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

  test('add user', async () => {
    await usersModel.addUser({ username: 'jake', password: 'hello' });
    const res = await usersModel.getUserById(4);
    expect(res.username).toMatch(/jake/i);
  });

  test('update user', async () => {
    await usersModel.updateUser({ username: 'pat', password: 'hiya' }, 1);
    const res = await usersModel.getUserById(1);
    expect(res.username).toBe('pat');
  });
});
