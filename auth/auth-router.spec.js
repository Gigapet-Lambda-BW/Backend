const supertest = require('supertest');
const server = require('../server');
const db = require('../data/db-config');
const authModel = require('./auth-model');
const authRouter = require('./auth-router');

beforeEach(async () => {
    await db.seed.run();
})

describe('register user tests', () => {
    test('verify user is created', async () => {
        const res = await supertest(server).post('/api/auth/register').send({ username: 'mark', password: 'abc234' });
        //console.log(res.username);
        expect(res.status).toBe(201);
        //! cant get username....undefined
    })

    //!! recieving 401 for test
    test('log user in', async () => {
        const res = await supertest(server).post('/api/auth/login').send({ username: 'harry', password: 'abc123' });
        // console.log(res);
        expect(res.status).toBe(200);
    })

})