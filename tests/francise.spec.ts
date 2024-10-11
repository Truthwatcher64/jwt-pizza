import { test, expect } from 'playwright-test-coverage';

test('visit franchise page', async ({page})=>{
    await page.goto('http://localhost:5173/');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('columnheader', { name: 'Year' }).click();
    await page.getByRole('columnheader', { name: 'Profit' }).click();
    await page.getByRole('columnheader', { name: 'Costs' }).click();
    await page.getByRole('columnheader', { name: 'Franchise Fee' }).click();
    await page.getByText('If you are already a').click();
});