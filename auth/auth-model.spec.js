const db = require('../data/db-config');
const authModel = require('./auth-model');

beforeEach(async () => {
    await db.seed.run();
})

describe('auth model', () => {
    test('find all users', async () => {
        const res = await authModel.find();
        expect(res.length).toBeGreaterThan(0);
    })

    test('findBy filter', async () => {
        const userHarry = await authModel.findBy({ userName: 'harry' }).first();
        expect(userHarry).toEqual({ id: 1, username: 'harry', password: 'abc123' });
    })

    test('findById', async () => {
        const res = await authModel.findById(2);
        expect(res.username).toMatch(/jared/i);
    })

    test('add user', async () => {
        await authModel.add({ userName: 'mikey', password: 'www' });
        let res = await authModel.find();
        expect(res).toHaveLength(4);
    })

    test('update user', async () => {
        await authModel.update(1, { username: 'Mabel' });
        const res = await authModel.findById(1);
        expect(res.username).toMatch(/mabel/i);
    })
})