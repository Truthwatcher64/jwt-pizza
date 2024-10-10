import { test, expect } from 'playwright-test-coverage';

test('basic register', async ({page})=>{
    await page.route('*/**/api/auth', async (route) => {
        const registerReq = {"name":"pizzaMaker", "email":"pizzaMaker@jwt.com", "password":"diner"};
        const registerRes =  { user: { id: 7, name: 'pizzaMaker', email: 'pizzaMaker@jwt.com', roles: [{ role: 'diner' }] }, token : "pizzaManToken" }
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(registerReq);
        await route.fulfill({ json: registerRes });
      });

      await page.goto('http://localhost:5173/');
      await page.getByRole('link', { name: 'Register' }).click();
      await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
      await expect(page.locator('form')).toContainText('Already have an account? Login instead.');
      await page.getByPlaceholder('Full name').click();
      await page.getByPlaceholder('Full name').fill('pizzaMaker');
      await page.getByPlaceholder('Email address').click();
      await page.getByPlaceholder('Email address').fill('pizzaMaker@jwt');
      await page.getByPlaceholder('Email address').click();
      await page.getByPlaceholder('Email address').fill('pizzaMaker@jwt.com');
      await page.getByPlaceholder('Password').click();
      await page.getByPlaceholder('Password').fill('diner');
      await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
      await expect(page.getByPlaceholder('Password')).toBeVisible();
      await page.getByRole('button', { name: 'Register' }).click();
      await expect(page.getByRole('link', { name: 'p' })).toBeVisible();
      await expect(page.getByLabel('Global')).toContainText('p');
      await page.getByRole('link', { name: 'p' }).click();
      await page.getByText('Your pizza kitchen').click();
      await page.getByRole('img', { name: 'Employee stock photo' }).click();
      await page.getByText('pizzaMaker', { exact: true }).click();
      await page.getByText('pizzaMaker@jwt.com').click();
      await page.getByText('diner', { exact: true }).click();
})