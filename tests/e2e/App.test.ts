import { test, expect } from "@playwright/test";

import AxeBuilder from "@axe-core/playwright";

test.describe("Functionality", () => {
  test("Has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("24 Solver");
  });

  test("Renders four random cards", async ({ page }) => {
    await page.goto("/");

    const titles = await page
      .getByTestId("card")
      .getByText(" of ")
      .allTextContents();
    expect(titles).toHaveLength(4);
    expect(new Set(titles).size).toBeGreaterThanOrEqual(2);

    await page.goto("/");

    const newTitles = await page
      .getByTestId("card")
      .getByText(" of ")
      .allTextContents();
    expect(newTitles).not.toStrictEqual(titles);
  });

  test("Updates card when asked", async ({ page }) => {
    await page.goto("/");

    const title = await page
      .getByTestId("card")
      .getByText(" of ")
      .first()
      .textContent();

    const select = page.getByLabel("Card 1");
    const currentValue = await select.inputValue();
    await select.selectOption({ value: `${(Number(currentValue) + 1) % 13}` });

    const newTitle = await page
      .getByTestId("card")
      .getByText(" of ")
      .first()
      .textContent();
    expect(newTitle).not.toStrictEqual(title);
  });

  test("Redraws hand when asked", async ({ page }) => {
    await page.goto("/");

    const titles = await page
      .getByTestId("card")
      .getByText(" of ")
      .allTextContents();

    const button = page.getByRole("button", { name: "Draw again" });
    await button.click();

    const newTitles = await page
      .getByTestId("card")
      .getByText(" of ")
      .allTextContents();
    expect(newTitles).not.toStrictEqual(titles);
  });

  test("Displays solutions for the current hand", async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.goto("/");

      const button = page.getByRole("button", { name: "Show solutions" });
      if ((await button.getAttribute("disabled")) === null) {
        break;
      }
    }

    const button = page.getByRole("button", { name: "Show solutions" });
    test.fail(
      (await button.getAttribute("disabled")) !== null,
      "No solutions after 5 tries"
    );

    const selects = await page.getByLabel("Card ").all();
    const values = (
      await Promise.all(selects.map((select) => select.inputValue()))
    ).map((value) => Number(value));

    if (values.includes(11) || values.includes(12) || values.includes(13)) {
      values.push(10);
    }
    await button.click();

    const solutions = await page.locator("pre").all();
    const texts = await Promise.all(
      solutions.map((solution) => solution.innerText())
    );
    for (const text of texts) {
      const numbers = text
        .split(" ")
        .map((part) => part.replace(/log_2\((\d+)\)/, "$1"))
        .map((part) => Number(part))
        .filter((part) => !Number.isNaN(part));

      for (const number of numbers) {
        expect(values).toContain(number);
      }
    }
  });

  test("Updates solutions after hand changes", async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.goto("/");

      const button = page.getByRole("button", { name: "Show solutions" });
      if ((await button.getAttribute("disabled")) === null) {
        break;
      }
    }

    const button = page.getByRole("button", { name: "Show solutions" });
    test.fail(
      (await button.getAttribute("disabled")) !== null,
      "No solutions after 5 tries"
    );

    await button.click();
    const solution = await page.locator("pre").first().textContent();

    for (let i = 0; i < 5; i++) {
      const redrawButton = page.getByRole("button", { name: "Draw again" });
      await redrawButton.click();

      const button = page.getByRole("button", { name: "Show solutions" });
      if ((await button.getAttribute("disabled")) !== null) {
        continue;
      }
      await button.click();

      const newSolution = await page.locator("pre").first().textContent();
      if (solution !== newSolution) {
        return;
      }
    }

    test.fail(true, "Solutions never changed after 5 redraws");
  });
});

test.describe("Accessibility", () => {
  test("Initial load is accessible", async ({ page }) => {
    await page.goto("/");

    const { passes, violations } = await new AxeBuilder({ page }).analyze();

    expect(passes.length).toBeGreaterThan(0);
    expect(violations.length).toBe(0);
  });

  test("Solutions are accessible", async ({ page }, { project }) => {
    test.slow(project.name === "Mobile Safari", "Slow in mobile Safari");

    await page.goto("/");

    for (let i = 0; i < 5; i++) {
      await page.goto("/");

      const button = page.getByRole("button", { name: "Show solutions" });
      if ((await button.getAttribute("disabled")) === null) {
        break;
      }
    }

    const button = page.getByRole("button", { name: "Show solutions" });
    test.fail(
      (await button.getAttribute("disabled")) !== null,
      "No solutions after 5 tries"
    );
    await button.click();

    const { passes, violations } = await new AxeBuilder({ page }).analyze();

    expect(passes.length).toBeGreaterThan(0);
    expect(violations.length).toBe(0);
  });
});
