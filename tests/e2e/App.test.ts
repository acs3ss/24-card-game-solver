import { test, expect } from "@playwright/test";

test("Has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("24 Solver");
});

test("Renders four random cards", async ({ page }) => {
  await page.goto("/");

  const cards = await page.getByTitle(" of ", { exact: false }).all();
  expect(cards).toHaveLength(4);
  const imageSrcs = await Promise.all(
    cards.map((card) => card.getAttribute("src"))
  );
  expect(new Set(imageSrcs).size).toBeGreaterThanOrEqual(2);

  await page.goto("/");

  const newCards = await page.getByTitle(" of ", { exact: false }).all();
  expect(newCards).toHaveLength(4);
  const newImageSrcs = await Promise.all(
    newCards.map((card) => card.getAttribute("src"))
  );
  for (let i = 0; i < imageSrcs.length; i++) {
    if (imageSrcs[i] !== newImageSrcs[i]) {
      return;
    }
  }

  test.fail(true, "No cards were different on the second render");
});

test("Updates card when asked", async ({ page }) => {
  await page.goto("/");

  const cards = await page.getByTitle(" of ", { exact: false }).all();
  const imageSrc = await cards[0].getAttribute("src");

  const select = page.getByLabel("Card 1");
  const currentValue = await select.inputValue();
  await select.selectOption({ value: `${(Number(currentValue) + 1) % 13}` });

  const newCards = await page.getByTitle(" of ", { exact: false }).all();
  expect(await newCards[0].getAttribute("src")).not.toStrictEqual(imageSrc);
});

test("Redraws hand when asked", async ({ page }) => {
  await page.goto("/");

  const cards = await page.getByTitle(" of ", { exact: false }).all();
  const imageSrcs = await Promise.all(
    cards.map((card) => card.getAttribute("src"))
  );

  const button = page.getByRole("button", { name: "Draw again" });
  await button.click();

  const newCards = await page.getByTitle(" of ", { exact: false }).all();
  const newImageSrcs = await Promise.all(
    newCards.map((card) => card.getAttribute("src"))
  );
  for (let i = 0; i < imageSrcs.length; i++) {
    if (imageSrcs[i] !== newImageSrcs[i]) {
      return;
    }
  }

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

  const selects = await page.getByLabel("Card ", { exact: false }).all();
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
  const solution = page.locator("pre").first();
  const text = await solution.innerText();

  for (let i = 0; i < 5; i++) {
    const redrawButton = page.getByRole("button", { name: "Draw again" });
    await redrawButton.click();

    const button = page.getByRole("button", { name: "Show solutions" });
    if ((await button.getAttribute("disabled")) !== null) {
      continue;
    }
    await button.click();

    const newSolution = page.locator("pre").first();
    const newText = await newSolution.innerText();
    if (text !== newText) {
      return;
    }
  }

  test.fail(true, "Solutions never changed after 5 redraws");
});
