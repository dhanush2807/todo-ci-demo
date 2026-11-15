// E2E: drive a real browser against the running server, like a user would.
import { test, expect } from '@playwright/test';

test('user can add, complete and delete a todo', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('New todo').fill('Learn CI/CD');
  await page.getByRole('button', { name: 'Add' }).click();

  const item = page.getByRole('listitem').filter({ hasText: 'Learn CI/CD' });
  await expect(item).toBeVisible();

  await item.getByRole('checkbox').check();
  await expect(item).toHaveClass(/done/);

  await item.getByRole('button', { name: 'Delete' }).click();
  await expect(item).toHaveCount(0);
});

test('user sees an error for an empty todo', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('alert')).toHaveText('title is required');
});
