import { test, expect } from "@playwright/test";

test("Employee search works", async ({ page }) => {
  //navigate to search page
  await page.goto("http://localhost:3000/employeesearch");
  //locate inputfield
  const inputField = await page.getByRole('textbox');
  //fill inputfield
  await inputField.fill("bill");
  //locate result
  const searchResult = page.locator(".employee-card");
  await expect(searchResult).toBeVisible();
  //get name from card
  const searchEmployeeName = await page
    .locator(".employee-card h2")
    .textContent();
  //click on card
  await searchResult.click();
  //locate
  const detailContainer = page.locator(".employee-detail-container");
  const detailEmployeeName = await detailContainer
    .locator(".employee-card h2")
    .first()
    .textContent();
  // await expect(detailContainer).toBeVisible();
  expect(searchEmployeeName?.trim()).toBe(detailEmployeeName?.trim());
});
