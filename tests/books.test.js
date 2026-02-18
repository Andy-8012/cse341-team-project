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

    await db.collection('books').insertMany([
        {
            title: "Test Book",
            author: "Author",
            isbn: "123",
            genre: "Test",
            pages: 100,
            publishedYear: 2020,
            available: true
        }
    ]);
});

afterAll(async () => {
    await mongodb.closeDb();
    await mongoServer.stop();
});

describe('Books Routes', () => {

    test('GET /books should return all books', async () => {
        const response = await request(app).get('/books');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /books/:id should return a single book', async () => {
        const all = await request(app).get('/books');
        const id = all.body[0]._id;

        const response = await request(app).get(`/books/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

});
