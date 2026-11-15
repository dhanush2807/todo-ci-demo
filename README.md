# todo-ci-demo

A small todo app for practicing CI/CD from a testing point of view.
Express API + plain HTML page, with tests at every level of the pyramid.

## Run locally

```bash
npm install
npx playwright install chromium   # once, for E2E tests
npm start                          # http://localhost:3000
```

## Test commands (same ones CI runs)

| Stage        | Command                    | What it checks                              |
|--------------|----------------------------|---------------------------------------------|
| Static       | `npm run lint`             | Code mistakes, without running anything     |
| Unit         | `npm run test:unit`        | `src/todos.js` logic in isolation           |
| Integration  | `npm run test:integration` | HTTP routes + logic via Supertest           |
| Coverage     | `npm run coverage`         | Unit + integration, with coverage report    |
| E2E          | `npm run test:e2e`         | Real browser clicking through the UI        |

## Layout

```
src/todos.js        business logic (unit tested)
src/app.js          Express routes (integration tested)
src/server.js       starts the server
public/index.html   UI (E2E tested)
tests/unit/         Vitest
tests/integration/  Vitest + Supertest
tests/e2e/          Playwright
.github/workflows/ci.yml   the pipeline
```

## Put it on GitHub

```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/todo-ci-demo.git
git push -u origin main
```

Then open the **Actions** tab to watch the pipeline.

## Practice exercises

1. **Break lint.** Add an unused variable in `src/app.js`, open a PR, and watch the pipeline stop at the `lint` job.
2. **Break a unit test.** Change the 100-character limit to 50 in `validateTitle`. See which tests fail and why.
3. **Break the API only.** Make `POST /api/todos` return 200 instead of 201. Unit tests stay green but integration fails.
4. **Break the UI only.** Rename the "Add" button to "Create". Only E2E fails. Download the `playwright-report` artifact and open the trace.
5. **Protect main.** In Settings > Branches, require the `lint`, `unit`, `integration` and `e2e` checks before merging.
6. **Write a new test** for a feature you add, such as "edit a todo title", at all three levels.
