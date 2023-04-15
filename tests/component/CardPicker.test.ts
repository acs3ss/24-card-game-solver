import { afterEach, describe, test, expect } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import CardPicker from "../../src/components/CardPicker.vue";

describe("CardPicker", () => {
  const props = {
    id: 1,
    value: 3,
    colorScheme: "light",
  };

  afterEach(() => {
    cleanup();
  });

  test("Renders a card with a picker", () => {
    render(CardPicker, { props });

    screen.getByLabelText(`Card ${props.id + 1}`);

    const regex = new RegExp(`${props.value} of`);
    const image = screen.getByTitle<HTMLImageElement>(regex);
    expect(screen.getByAltText(regex)).toStrictEqual(image);

    expect(image.src).toMatch(
      new RegExp(`${props.colorScheme}/${props.value}\\w.svg`)
    );
  });

  test("Renders a random face on load", async () => {
    render(CardPicker, { props });

    const regex = new RegExp(`${props.value} of`);
    const title = screen.getByTitle(regex).title;

    for (let i = 0; i < 10; i++) {
      cleanup();
      render(CardPicker, { props });
      if (screen.getByTitle(regex).title !== title) {
        return;
      }
    }

    expect.fail("Card face did not change after 10 rerenders");
  });

  test("Emits event when new card is selected", async () => {
    const { emitted } = render(CardPicker, { props });

    expect(emitted()).to.be.empty;

    const select = screen.getByLabelText(`Card ${props.id + 1}`);
    const newValue = 5;
    await fireEvent.update(select, `${newValue}`);

    expect(emitted().select).toBeDefined();
    expect(emitted().select).toHaveLength(1);
    expect(emitted().select[0]).toStrictEqual([newValue]);
  });

  test("Changes card theme when color scheme is updated", async () => {
    const { rerender } = render(CardPicker, { props });

    await rerender({
      ...props,
      colorScheme: "dark",
    });

    const regex = new RegExp(`${props.value} of`);
    const image = screen.getByTitle<HTMLImageElement>(regex);

    expect(image.src).toMatch(new RegExp(`dark/${props.value}\\w.svg`));
  });
});
