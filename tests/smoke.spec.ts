import { test, expect } from "@playwright/test";

test("app renders", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByText("App loaded")).toBeVisible();
});
