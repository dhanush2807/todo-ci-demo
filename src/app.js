// HTTP layer. Exported without listen() so tests can drive it directly.
import express from 'express';
import { fileURLToPath } from 'node:url';
import { createStore } from './todos.js';

export function createApp(store = createStore()) {
  const app = express();
  app.use(express.json());
  app.use(express.static(fileURLToPath(new URL('../public', import.meta.url))));

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  app.get('/api/todos', (req, res) => res.json(store.list()));

  app.post('/api/todos', (req, res) => {
    try {
      res.status(201).json(store.add(req.body?.title));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch('/api/todos/:id/toggle', (req, res) => {
    const todo = store.toggle(Number(req.params.id));
    if (!todo) return res.status(404).json({ error: 'not found' });
    res.json(todo);
  });

  app.delete('/api/todos/:id', (req, res) => {
    if (!store.remove(Number(req.params.id))) return res.status(404).json({ error: 'not found' });
    res.status(204).end();
  });

  return app;
}
