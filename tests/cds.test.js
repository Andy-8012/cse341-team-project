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

    await db.collection('cds').insertMany([
        {
            title: "Title Cd",
            artist: "Artist",
            genre: "Test",
            releaseYear: 2019,
            label: "Test"
        }
    ]);
});

afterAll(async () => {
    await mongodb.closeDb();
    await mongoServer.stop();
});

describe('Cds Routes', () => {

    test('GET /cds should return all cds', async () => {
        const response = await request(app).get('/cds');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /cds/:id should return a single cd', async () => {
        const all = await request(app).get('/cds');
        const id = all.body[0]._id;

        const response = await request(app).get(`/cds/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

});
