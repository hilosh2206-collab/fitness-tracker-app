const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
});

test("blocks submission and shows an error when fields are missing", async ({ page }) => {
  const error = page.locator("#form-error");
  await expect(error).toBeHidden();

  await page.getByRole("button", { name: "Create Workout" }).click();

  await expect(error).toBeVisible();
  await expect(error).toHaveText("Please fill in all fields before submitting.");
  await expect(page.locator("#saved-list li")).toHaveCount(0);
});

test("still blocks submission when only some fields are filled", async ({ page }) => {
  await page.getByLabel("Workout Goal").selectOption("fat-loss");
  await page.getByLabel("Experience Level").selectOption("beginner");

  await page.getByRole("button", { name: "Create Workout" }).click();

  await expect(page.locator("#form-error")).toBeVisible();
  await expect(page.locator("#saved-list li")).toHaveCount(0);
});

test("clears the error once the missing fields are filled in", async ({ page }) => {
  const error = page.locator("#form-error");
  await page.getByRole("button", { name: "Create Workout" }).click();
  await expect(error).toBeVisible();

  await page.getByLabel("Workout Goal").selectOption("fat-loss");
  await expect(error).toBeHidden();
});

test("saves the workout once all fields are filled", async ({ page }) => {
  await page.getByLabel("Workout Goal").selectOption("fat-loss");
  await page.getByLabel("Experience Level").selectOption("beginner");
  await page.getByLabel("Days per Week").selectOption("3");
  await page.getByLabel("Available Equipment").selectOption("no-equipment");

  await page.getByRole("button", { name: "Create Workout" }).click();

  await expect(page.locator("#form-error")).toBeHidden();
  await expect(page.getByText("Beginner · 3x/week · No equipment")).toBeVisible();
});
