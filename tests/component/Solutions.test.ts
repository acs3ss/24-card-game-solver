import { page, userEvent } from "vitest/browser";
import { describe, expect, test } from "vitest";
import Solutions from "../../src/components/Solutions.vue";

describe("Solutions", () => {
  const props = {
    solutions: ["8 * 1 + 2 * 8", "2 * 8 + 8 * 1", "log_2(8) * 8 * 1"],
  };

  test("Hides solutions by default", async () => {
    const screen = page.render(Solutions, { props });

    const solutions = screen
      .getByText(props.solutions[0])
      .or(screen.getByText(props.solutions[1]))
      .or(screen.getByText(props.solutions[2]));

    await expect.element(solutions).toHaveLength(0);

    await expect
      .element(
        screen.getByRole("button", {
          name: "Show solutions",
        }),
      )
      .toBeVisible();
  });

  test("Toggles solutions when button is clicked", async () => {
    const screen = page.render(Solutions, { props });

    const showSolutionsButton = screen.getByRole("button", {
      name: "Show solutions",
    });
    await userEvent.click(showSolutionsButton);

    const solutions = screen
      .getByText(props.solutions[0])
      .or(screen.getByText(props.solutions[1]))
      .or(screen.getByText(props.solutions[2]));

    await expect.element(solutions).toHaveLength(props.solutions.length);

    const hideSolutionsButton = screen.getByRole("button", {
      name: "Hide solutions",
    });
    await userEvent.click(hideSolutionsButton);
    await expect.element(solutions).toHaveLength(0);
  });

  test("Hides solutions when they change", async () => {
    const screen = page.render(Solutions, { props });

    const showSolutionsButton = screen.getByRole("button", {
      name: "Show solutions",
    });
    await userEvent.click(showSolutionsButton);

    const newSolution = "3 * 2 * 2 * 2";
    await screen.rerender({
      solutions: [newSolution],
    });

    await expect
      .element(
        screen.getByRole("button", {
          name: "Show solutions",
        }),
      )
      .toBeVisible();

    const solutions = screen
      .getByText(props.solutions[0])
      .or(screen.getByText(props.solutions[1]))
      .or(screen.getByText(props.solutions[2]))
      .or(screen.getByText(newSolution));

    await expect.element(solutions).toHaveLength(0);
  });

  test("Disables showing solutions when none exist", async () => {
    const screen = page.render(Solutions, {
      props: {
        solutions: [],
      },
    });

    const showSolutionsButton = screen.getByRole("button", {
      name: "Show solutions",
    });

    await expect.element(showSolutionsButton).toBeDisabled();
  });

  test("Emits event when new cards are requested", async () => {
    const screen = page.render(Solutions, { props });

    const { emitted } = screen;

    expect(emitted()).to.be.empty;

    const redrawButton = screen.getByRole("button", {
      name: "Draw again",
    });
    await userEvent.click(redrawButton);

    expect(emitted().redraw).toBeDefined();
    expect(emitted().redraw).toHaveLength(1);
    expect(emitted().redraw[0]).to.be.empty;
  });
});
