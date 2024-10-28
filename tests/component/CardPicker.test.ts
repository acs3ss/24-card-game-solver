import { afterEach, describe, test, expect } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import CardPicker from "../../src/components/CardPicker.vue";

describe("CardPicker", () => {
  const props = {
    id: 1,
    value: 3,
  };

  afterEach(() => {
    cleanup();
  });

  test("Renders a card with a picker", () => {
    render(CardPicker, { props });

    screen.getByLabelText(`Card ${props.id + 1}`);

    const combobox = screen.getByRole("combobox", {
      name: `Card ${props.id + 1}`,
    });
    expect(combobox.children).toHaveLength(13);

    screen.getByTestId("card");
  });

  test("Renders a random card on load", () => {
    render(CardPicker, { props });
    const card = screen.getByTestId("card");

    for (let i = 0; i < 10; i++) {
      cleanup();
      render(CardPicker, { props });
      if (!card.isEqualNode(screen.getByTestId("card"))) {
        return;
      }
    }

    expect.fail("Card face did not change after 10 rerenders");
  });

  test("Emits event when a new card is selected", async () => {
    const { emitted } = render(CardPicker, { props });

    expect(emitted()).to.be.empty;

    const select = screen.getByLabelText(`Card ${props.id + 1}`);
    const newValue = 5;
    await fireEvent.update(select, `${newValue}`);

    expect(emitted().select).toBeDefined();
    expect(emitted().select).toHaveLength(1);
    expect(emitted().select[0]).toStrictEqual([newValue]);
  });
});
