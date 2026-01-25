import { describe, test, expect } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup } from "vitest-browser-vue";
import CardPicker from "../../src/components/CardPicker.vue";

describe("CardPicker", () => {
  const props = {
    id: 1,
    value: 3,
  };

  test("Renders a card with a picker", () => {
    const screen = page.render(CardPicker, { props });

    screen.getByLabelText(`Card ${props.id + 1}`);

    const combobox = screen.getByRole("combobox", {
      name: `Card ${props.id + 1}`,
    });
    expect(combobox.element().children).toHaveLength(13);

    screen.getByTestId("card");
  });

  test("Renders a random card on load", () => {
    const screen = page.render(CardPicker, { props });
    const card = screen.getByTestId("card").element();

    // Need a full render because rerender won't do anything if the props don't change.
    for (let i = 0; i < 10; i++) {
      cleanup();
      const screen = page.render(CardPicker, { props });
      if (!card.isEqualNode(screen.getByTestId("card").element())) {
        return;
      }
    }

    expect.fail("Card face did not change after 10 rerenders");
  });

  test("Emits event when a new card is selected", async () => {
    const screen = page.render(CardPicker, { props });

    const { emitted } = screen;

    expect(emitted()).to.be.empty;

    const select = screen.getByLabelText(`Card ${props.id + 1}`);
    const newValue = 5;
    await userEvent.selectOptions(select, `${newValue}`);

    expect(emitted().select).toBeDefined();
    expect(emitted().select).toHaveLength(1);
    expect(emitted().select[0]).toStrictEqual([newValue]);
  });
});
