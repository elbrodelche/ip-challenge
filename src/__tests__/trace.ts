import * as request from 'supertest';
import app from '../app';

test('should respond 200', async () => {
    const requestBody = { ip: '202.14.186.34' };
    const response = await request(app.callback())
        .post('/v1/traces')
        .set('Content-Type', 'application/json')
        .send(requestBody);
    expect(response.status).toBe(200);
});
