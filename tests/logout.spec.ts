import { test, expect } from 'playwright-test-coverage';

test('login then logout', async ({page})=>{

      await page.goto('http://localhost:5173/');
      await tempRegister(page);

      await page.route('*/**/api/auth', async (route) => {
        const registerReq = null//'Authorization: Bearer coolToken';
        const registerRes =  {message: 'logout successful'}
        //expect(route.request().method()).toBe('DELETE');
        //expect(route.request().postDataJSON()).toMatchObject(registerReq);
        await route.fulfill({ json: registerRes });
      });

      await page.getByRole('link', { name: 'KC' }).click();
      await page.getByRole('link', { name: 'Logout' }).click();
      await page.getByText('The web\'s best pizza', { exact: true }).click();
      await page.getByLabel('Global').getByRole('img').click();
      await page.getByRole('main').getByRole('img').click();
});

async function tempRegister(page){
    
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        //expect(route.request().method()).toBe('PUT');
        //expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

}