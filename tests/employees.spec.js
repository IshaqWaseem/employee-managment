import { test, expect } from '@playwright/test';

test('should display "Employee Management" in the navbar', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Try a flexible selector
  const navbarTitle = page.locator('a', { hasText: 'Employee Management' });

  // Ensure the element is visible
  await navbarTitle.waitFor({ state: 'visible' });

  // Log the actual text for debugging
  const actualText = await navbarTitle.textContent();
  console.log(`Actual text: ${actualText}`);

  // Assert the text
  await expect(navbarTitle).toHaveText('Employee Management');
});

test('should navigate to the Employees page when clicking the Employees link', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:3000');
  
    // Click the "Employees" link in the navbar
    await page.click('nav a[href="/employees"]');
  
    // Verify that the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/employees');
  });

  test('Employee cards load up', async ({ page }) => {

  await page.goto('http://localhost:3000/employees');

    // Click the get started link.
    await page.getByRole('link', { name: 'Employees' }).click();
    // Click the get started link.
    // await page.getByRole('link', { name: 'Employees' }).click();

    // Locate the employee card for "Bill Gates"
    const billGatesCard = page.locator('.employee-card h2', { hasText: 'Bill Gates' });

    // Wait for the card to be visible
    await billGatesCard.waitFor({ state: 'visible' });
  
    // Check if "Bill Gates" is visible
    await expect(billGatesCard).toBeVisible();

    // const pageTitle = page.locator('h2', { hasText: 'Bill Gates' });
    // await expect(pageTitle).toBeVisible();
});


test('should display employee details when an employee card is clicked', async ({ page }) => {
    // Navigate to the Employees page
    await page.goto('http://localhost:3000/employees');
  
    // Select the first employee card
    const firstEmployeeCard = page.locator('.employee-item').first();
    const employeeName = await firstEmployeeCard.locator('h2').textContent();
  
    // Click the first employee card
    await firstEmployeeCard.click();
  
    // Wait for the details view to be visible
    const detailContainer = page.locator('.employee-detail-container');
    await expect(detailContainer).toBeVisible();
  
    // Wait for the employee name to be loaded
    // await detailContainer.locator('.employee-card h2').waitFor();
  
    // Retrieve the employee name from the details view
    const detailEmployeeName = await detailContainer.locator('.employee-card h2').first().textContent();
  
    // Assert that the clicked employee name matches the details view
    expect(detailEmployeeName?.trim()).toBe(employeeName?.trim());
  });
