import * as request from 'supertest';
import app from '../app';

test('should, display proper docs', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).toBe(200);
});

test('should respond to health test', async () => {
    const response = await request(app.callback()).get('/v1/ping');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Pong');
});
