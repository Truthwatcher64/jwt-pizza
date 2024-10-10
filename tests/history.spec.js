import { test, expect } from 'playwright-test-coverage';

test('History Page', async ({page}) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('contentinfo')).toContainText('History');
    await page.getByRole('link', { name: 'History' }).click();
    await page.getByRole('main').getByRole('img').click();
    await page.getByText('Mama Rucci, my my').click();
})