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

test('login and go to admin dashboard', async ({page})=>{
    
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      await page.goto('http://localhost:5173/');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.getByPlaceholder('Email address').fill('a@jwt.com');
      await page.getByPlaceholder('Email address').press('Tab');
      await page.getByPlaceholder('Password').fill('admin');
      await page.getByRole('button', { name: 'Login' }).click();


});