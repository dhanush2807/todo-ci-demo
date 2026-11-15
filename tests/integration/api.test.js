// INTEGRATION: test HTTP routes + logic together through real requests.
// Supertest calls the Express app in-process; no port, no browser.
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';

let app;
beforeEach(() => {
  app = createApp(); // fresh store per test = no shared state, no flakiness
});

describe('API', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('POST then GET returns the created todo', async () => {
    const created = await request(app).post('/api/todos').send({ title: 'write tests' });
    expect(created.status).toBe(201);

    const list = await request(app).get('/api/todos');
    expect(list.body).toEqual([{ id: 1, title: 'write tests', done: false }]);
  });

  it('POST with an empty title returns 400', async () => {
    const res = await request(app).post('/api/todos').send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('title is required');
  });

  it('POST with no body returns 400, not 500', async () => {
    const res = await request(app).post('/api/todos');
    expect(res.status).toBe(400);
  });

  it('PATCH toggle on a missing id returns 404', async () => {
    const res = await request(app).patch('/api/todos/999/toggle');
    expect(res.status).toBe(404);
  });

  it('DELETE removes the todo', async () => {
    await request(app).post('/api/todos').send({ title: 'x' });
    expect((await request(app).delete('/api/todos/1')).status).toBe(204);
    expect((await request(app).get('/api/todos')).body).toEqual([]);
  });
});
