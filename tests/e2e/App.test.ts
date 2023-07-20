import { test, expect } from "@playwright/test";

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

  test.fail(true, "No cards were different on the second render");
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

  test.fail(true, "No cards were different after redrawing");
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
  for (const solution of solutions) {
    const text = await solution.innerText();
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
