import * as request from 'supertest';
import app from '../app';

test('sould respond 200 to /statistics', async () => {
    const response = await request(app.callback()).get('/v1/statistics');
    expect(response.status).toBe(200);
});