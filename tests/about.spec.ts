import { test, expect } from 'playwright-test-coverage';

test('about page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('The secret sauce')).toBeVisible();
  await page.locator('div').filter({ hasText: /^James$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Maria$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Anna$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Brian$/ }).getByRole('img').click();
});