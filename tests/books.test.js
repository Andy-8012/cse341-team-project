const request = require('supertest');
const app = require('../server');

describe('Books Routes', () => {

    test('GET /books should return all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /books/:id should return a single book', async () => {
        const response = await request(app).get('/books');
        const id = response.body[0]._id;

        const singleResponse = await request(app).get(`/books/${id}`);
        expect(singleResponse.statusCode).toBe(200);
        expect(singleResponse.body).toHaveProperty('_id');
    });

});