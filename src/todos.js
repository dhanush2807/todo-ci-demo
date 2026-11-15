// Pure business logic: no HTTP, no I/O. Easy to unit test.
export function createStore() {
  let nextId = 1;
  const items = [];

  return {
    list() {
      return [...items];
    },
    add(title) {
      const clean = validateTitle(title);
      const todo = { id: nextId++, title: clean, done: false };
      items.push(todo);
      return todo;
    },
    toggle(id) {
      const todo = items.find((t) => t.id === id);
      if (!todo) return null;
      todo.done = !todo.done;
      return todo;
    },
    remove(id) {
      const i = items.findIndex((t) => t.id === id);
      if (i === -1) return false;
      items.splice(i, 1);
      return true;
    },
  };
}

export function validateTitle(title) {
  if (typeof title !== 'string') throw new Error('title must be a string');
  const clean = title.trim();
  if (clean.length === 0) throw new Error('title is required');
  if (clean.length > 100) throw new Error('title must be 100 characters or less');
  return clean;
}
