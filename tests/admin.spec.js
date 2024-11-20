import { test, expect, request } from "@playwright/test";

test.describe("Employee Management", () => {
  let apiContext;
  test.beforeAll(async ({}) => {
    apiContext = await request.newContext({
      ignoreHTTPSErrors: true,
    });
  });
  test.afterAll(async () => {
    //delete employees that were created for the tests
    const testSearchResponse = await apiContext.get(
      "https://localhost:7217/api/Employees/test/search"
    );
    const testEmployee = await testSearchResponse.json();
    const testerId = testEmployee[0]?.employeeId;
    if (testerId) {
      const deleteTesterResponse = await apiContext.delete(
        `https://localhost:7217/api/Employees/${testerId}`
      );
      expect(deleteTesterResponse.ok()).toBeTruthy();
    }
    const updateSearchResponse = await apiContext.get(
      "https://localhost:7217/api/Employees/update/search"
    );
    const updaterEmployee = await updateSearchResponse.json();
    const updaterId = updaterEmployee[0]?.employeeId;
    if (updaterId) {
      const deleteUpdaterResponse = await apiContext.delete(
        `https://localhost:7217/api/Employees/${updaterId}`
      );
      expect(deleteUpdaterResponse.ok()).toBeTruthy();
    }
  });
  test("Create employee", async ({ page }) => {
    //navigate to search page
    await page.goto("http://localhost:3000/admin");
    //open create ui
    await page.getByRole("button", { name: "Create" }).click();
    //fill inputfields
    await page.getByLabel("First Name:").fill("Test");
    await page.getByLabel("Last  Name:").fill("Testerson");
    await page.getByLabel("Position:").fill("Tester");
    //select manager
    await page.getByRole("button", { name: "Select Manager" }).click();
    await page.locator("form").getByPlaceholder("Search employees...").click();
    await page
      .locator("form")
      .getByPlaceholder("Search employees...")
      .fill("bill");
    await page.getByRole("heading", { name: "Bill Gates" }).click();
    //submit
    await page.getByRole("button", { name: "Add Employee" }).click();
    await expect(page.getByText("Employee created successfully")).toBeVisible();
  });

  test("update employee", async ({ page }) => {
    await apiContext.post("https://localhost:7217/api/Employees", {
      headers: { "Content-Type": "application/json" },
      data: {
        employeeId: 0,
        firstName: "Outdate",
        lastName: "Outdatedsom",
        position: "Outdater",
        managerId: 1,
      },
    });

    //navigate to search page
    await page.goto("http://localhost:3000/admin", {
      waitUntil: "networkidle",
    });
    //open edit ui
    await page.getByRole("button", { name: "Update" }).click();
    //find employee
    await page.getByPlaceholder("Search employees...").fill("Outdate");
    // await page.getByRole('heading', { name: 'Test Testerson' }).click();
    await page.getByText("Outdate Outdatedsom Outdater").first().click();
    //fill inputfields
    await page.waitForTimeout(1000);
    // await page.locator('input[name="firstName"]').waitFor({ state: 'visible', timeout: 1000 });
    await page.locator('input[name="firstName"]').fill("Update");
    await page.locator('input[name="lastName"]').fill("Updateson");
    await page.locator('input[name="position"]').fill("Updater");
    //select manager
    await page.getByRole("button", { name: "Clear Manager" }).click();
    //submit
    await page.getByRole("button", { name: "Update Employee" }).click();
    await expect(page.getByText("Employee updated successfully")).toBeVisible();
  });
  test("try to make employee their own manager", async ({ page }) => {
    await page.goto("http://localhost:3000/admin", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Update" }).click();
    await page.getByPlaceholder("Search employees...").fill("Bill");
    await page.getByRole("heading", { name: "Bill Gates" }).click();
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Select Manager" }).click();
    await page
      .locator("form")
      .getByPlaceholder("Search employees...")
      .fill("bill");
    await page.getByRole("heading", { name: "Bill Gates" }).click();
    await page.getByRole("button", { name: "Update Employee" }).click();
    await expect(
      page.getByText("An employee cannot be their own manager")
    ).toBeVisible();
  });
  test("delete employee", async ({ page }) => {
    await apiContext.post("https://localhost:7217/api/Employees", {
      headers: { "Content-Type": "application/json" },
      data: {
        employeeId: 0,
        firstName: "Delete",
        lastName: "Deleteson",
        position: "Deleter",
        managerId: 1,
      },
    });
    //navigate to search page
    await page.goto("http://localhost:3000/admin", {
      waitUntil: "networkidle",
    });
    //open delete ui
    await page.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Select Employee" }).click();
    //search employee
    await page.getByPlaceholder("Search employees...").fill("Delete");
    //select employee
    await page
      .getByRole("heading", { name: "Delete Deleteson" })
      .first()
      .click();
    //submit
    await page.getByRole("button", { name: "Delete Employee" }).click();
    await expect(page.getByText("Employee deleted successfully")).toBeVisible();
  });
});
