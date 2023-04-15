import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, describe, expect, test } from "vitest";
import Solutions from "../../src/components/Solutions.vue";

describe("Solutions", () => {
  const props = {
    solutions: ["8 * 1 + 2 * 8", "2 * 8 + 8 * 1", "log_2(8) * 8 * 1"],
  };

  afterEach(() => {
    cleanup();
  });

  test("Hides solutions by default", () => {
    render(Solutions, { props });

    const regex = new RegExp(
      props.solutions.join("|").replace(/[*+()]/g, "\\$&")
    );
    expect(screen.queryAllByText(regex)).to.be.empty;

    screen.getByRole("button", {
      name: "Show solutions",
    });
  });

  test("Toggles solutions when button is clicked", async () => {
    render(Solutions, { props });

    const regex = new RegExp(
      props.solutions.join("|").replace(/[*+()]/g, "\\$&")
    );

    const showSolutionsButton = screen.getByRole("button", {
      name: "Show solutions",
    });
    await fireEvent.click(showSolutionsButton);
    expect(screen.getAllByText(regex)).toHaveLength(props.solutions.length);

    const hideSolutionsButton = screen.getByRole("button", {
      name: "Hide solutions",
    });
    await fireEvent.click(hideSolutionsButton);
    expect(screen.queryAllByText(regex)).to.be.empty;
  });

  test("Hides solutions when they change", async () => {
    const { rerender } = render(Solutions, { props });

    const showSolutionsButton = screen.getByRole("button", {
      name: "Show solutions",
    });
    await fireEvent.click(showSolutionsButton);

    await rerender({
      solutions: ["3 * 2 * 2 * 2"],
    });

    screen.getByRole("button", {
      name: "Show solutions",
    });

    const regex = new RegExp(
      props.solutions.join("|").replace(/[*+()]/g, "\\$&")
    );
    expect(screen.queryAllByText(regex)).to.be.empty;
  });

  test("Disables showing solutions when none exist", () => {
    render(Solutions, {
      props: {
        solutions: [],
      },
    });

    const showSolutionsButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Show solutions",
    });

    expect(showSolutionsButton.disabled).to.be.true;
  });

  test("Emits event when new cards are requested", async () => {
    const { emitted } = render(Solutions, { props });

    expect(emitted()).to.be.empty;

    const redrawButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Draw again",
    });
    await fireEvent.click(redrawButton);

    expect(emitted().redraw).toBeDefined();
    expect(emitted().redraw).toHaveLength(1);
    expect(emitted().redraw[0]).to.be.empty;
  });
});
