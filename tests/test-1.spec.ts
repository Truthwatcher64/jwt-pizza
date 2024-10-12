import { test, expect } from 'playwright-test-coverage';

// test('cancel a franchise creation', async ({ page }) => {
//   await page.goto('http://localhost:5173/');
//   await page.getByText('OrderFranchiseLoginRegister').click();
//   await page.getByLabel('Global').click();
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByPlaceholder('Email address').fill('a@jwt.com');
//   await page.getByPlaceholder('Email address').press('Tab');
//   await page.getByPlaceholder('Password').fill('admin');
//   await page.getByPlaceholder('Password').press('Enter');
//   await page.getByRole('link', { name: 'Admin' }).click();
//   await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
//   await page.getByRole('button', { name: 'Add Franchise' })
//   await page.getByRole('button', { name: 'Add Franchise' }).click();
//   await page.getByRole('button', { name: 'Cancel' }).click();
//   await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
// });


test('able', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'a@jwt.com', password: 'admin' };
    const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });



  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('link', { name: 'Admin' }).click();



  await page.getByText('Mama Ricci\'s kitchen').click();
  await page.getByRole('columnheader', { name: 'Franchise', exact: true }).click();
  await page.getByRole('columnheader', { name: 'Franchisee' })
  await page.getByRole('columnheader', { name: 'Store' })
  await page.getByRole('columnheader', { name: 'Revenue' })
  await page.getByRole('columnheader', { name: 'Action' })
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await expect(page.locator('form')).toContainText('Want to create franchise?');
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('pizzaPocket');

  await page.route('*/**/api/franchise', async (route) => {
    const createReq = { "name": "pizzaPocket", "admins": [{ "email": "a@jwt.com" }] };
    const createRes = { name: 'pizzaPocket', admins: [{ email: 'a@jwt.com', id: 1, name: '常用名字' }], id: 1 }
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(createReq);
    await route.fulfill({ json: createRes });
  });
  await page.getByRole('button', { name: 'Create' }).click();
});