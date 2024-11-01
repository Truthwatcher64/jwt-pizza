import { test, expect } from 'playwright-test-coverage';

test('create a store', async ({ page }) => {

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });


    await page.route('*/**/api/franchise/3', async (route) => {
        const loginRes =
            [
                {
                    "id": 2,
                    "name": "pizzaPocket",
                    "admins": [
                        {
                            "id": 4,
                            "name": "pizza franchisee",
                            "email": "f@jwt.com"
                        }
                    ],
                    "stores": [
                    ]
                }
            ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/2/store/', async (route) => {
        expect(route.request().method()).toBe('POST');
        const res = {
            "id": 1,
            "franchiseId": 2,
            "name": "Downtown"
        };

        await route.fulfill({ json: res });
    });



    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('admin');
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByLabel('Global').click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByPlaceholder('store name').click();
    await page.getByPlaceholder('store name').fill('Downtown');
    await page.getByRole('button', { name: 'Create' }).click();
    //await page.getByRole('cell', { name: 'Downtown' }).click();


});

test('delete a store', async ({ page }) => {

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const loginRes =
            [
                {
                    "id": 2,
                    "name": "pizzaPocket",
                    "admins": [
                        {
                            "id": 4,
                            "name": "pizza franchisee",
                            "email": "f@jwt.com"
                        }
                    ],
                    "stores": [
                        {
                            "id": 4,
                            "name": "SLC",
                            "totalRevenue": 0
                        }
                    ]
                }
            ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/2/store/4', async (route) => {
        expect(route.request().method()).toBe('DELETE');
        const res = {
            "message": "store deleted"
        };

        await route.fulfill({ json: res });
    });


    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('admin');
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByRole('link', { name: 'Admin' }).click();


    await page.getByRole('cell', { name: 'pizzaPocket' }).click();
    await page.getByRole('cell', { name: 'pizza franchisee' }).click();
    await page.getByRole('row', { name: 'pizzaPocket pizza franchisee' }).getByRole('button').isVisible();
    await page.getByRole('row', { name: 'SLC 0 ₿ Close' }).getByRole('button').isVisible();


    await page.getByRole('row', { name: 'SLC 0 ₿ Close' }).getByRole('button').
        click();
    await page.getByRole('button', { name: 'Close' }).click();
    //await page.getByRole('link', { name: 'admin-dashboard' }).click();

    // await page.getByRole('button', { name: 'Close' }).click();
    // await page.getByRole('button', { name: 'Close' }).click();


});



test('delete a franchise', async ({ page }) => {

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const loginRes =
            [
                {
                    "id": 2,
                    "name": "pizzaPocket",
                    "admins": [
                        {
                            "id": 4,
                            "name": "pizza franchisee",
                            "email": "f@jwt.com"
                        }
                    ],
                    "stores": [
                    ]
                }
            ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/2/store/4', async (route) => {
        expect(route.request().method()).toBe('DELETE');
        const res = {
            "message": "franchise deleted"
        };

        await route.fulfill({ json: res });
    });


    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('a@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('admin');
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByRole('link', { name: 'Admin' }).click();


    await page.getByRole('cell', { name: 'pizzaPocket' }).click();
    await page.getByRole('cell', { name: 'pizza franchisee' }).click();
    await page.getByRole('row', { name: 'pizzaPocket pizza franchisee' }).getByRole('button').isVisible();
    await page.getByRole('row', { name: 'SLC 0 ₿ Close' }).getByRole('button').isVisible();



    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Close' }).click();


});