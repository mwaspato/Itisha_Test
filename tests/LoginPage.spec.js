import { test, expect } from '@playwright/test';

test.describe('Login Scenarios', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test('Login with correct credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    
    // Assert the exact success message
    await expect(page.locator('#flash')).toContainText(
      'You logged into a secure area!'
    );
    
    // Ensure the success message contains additional text
    await expect(page.locator('body')).toContainText(
      'Welcome to the Secure Area. When you are done click logout below.'
    );

    // Ensure logout button is visible after successful login
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('Login with incorrect password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('Login with incorrect username', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('invalidUser');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Login with both invalid username and password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('invalidUser123');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Attempt login without entering a username', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Attempt login without entering a password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('Attempt login without entering any credentials', async ({ page }) => {
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Attempt login with special characters in username', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('@#%$*tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

});
