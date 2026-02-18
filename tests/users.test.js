const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongodb = require('../data/database');

let app;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongodb.initDb(uri);

    app = require('../server');

    const db = mongodb.getDatabase();

    await db.collection('users').insertMany([
        {
            firstName: "First Name",
            lastName: "Last Name",
            email: "name@example.com",
            username: "Test",
            role: "Test"
        }
    ]);
});

afterAll(async () => {
    await mongodb.closeDb();
    await mongoServer.stop();
});

describe('Users Routes', () => {

    test('GET /users should return all users', async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /users/:id should return a single user', async () => {
        const all = await request(app).get('/users');
        const id = all.body[0]._id;

        const response = await request(app).get(`/users/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

});
