const request = require('supertest');
const app = require('../server');

describe('Cds Routes', () => {

    test('GET /cds should return all cds', async () => {
        const response = await request(app).get('/cds');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /cds/:id should return a single cd', async () => {
        const response = await request(app).get('/cds');
        const id = response.body[0]._id;

        const singleResponse = await request(app).get(`/cds/${id}`);
        expect(singleResponse.statusCode).toBe(200);
        expect(singleResponse.body).toHaveProperty('_id');
    });

});