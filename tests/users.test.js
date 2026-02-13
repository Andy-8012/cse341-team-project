const request = require('supertest');
const app = require('../server');

describe('Users Routes', () => {

    test('GET /users should return all users', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /users/:id should return a single user', async () => {
        const response = await request(app).get('/users');
        const id = response.body[0]._id;

        const singleResponse = await request(app).get(`/users/${id}`);
        expect(singleResponse.statusCode).toBe(200);
        expect(singleResponse.body).toHaveProperty('_id');
    });

});