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

    await db.collection('movies').insertMany([
        {
            title: "Test movie",
            director: "Director",
            genre: "Scary",
            releaseYear: 2000,
            durationMinutes: 100,
            rating: 10,
            available: true
        }
    ]);
});

afterAll(async () => {
    await mongodb.closeDb();
    await mongoServer.stop();
});

describe('Books Routes', () => {

    test('GET /movies should return all movies', async () => {
        const response = await request(app).get('/movies');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /movies/:id should return a single movie', async () => {
        const all = await request(app).get('/movies');
        const id = all.body[0]._id;

        const response = await request(app).get(`/movies/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

});
