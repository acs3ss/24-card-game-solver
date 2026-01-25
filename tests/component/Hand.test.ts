import { page, userEvent } from "vitest/browser";
import { describe, expect, test } from "vitest";
import Hand from "../../src/components/Hand.vue";

describe("Hand", () => {
  const props = {
    hand: [5, 3, 7, 8],
  };

  test("Renders four CardPickers", async () => {
    const screen = page.render(Hand, { props });

    const cards = screen.getByLabelText("Card ", {
      exact: false,
    });
    expect(cards.elements()).toHaveLength(props.hand.length);

    for (let i = 0; i < props.hand.length; i++) {
      await expect.element(cards.elements()[i]).toHaveValue(`${props.hand[i]}`);
    }
  });

  test("Emits event when new card is selected", async () => {
    const screen = page.render(Hand, { props });

    const { emitted } = screen;

    expect(emitted()).to.be.empty;

    const id = 0;
    const select = screen.getByLabelText(`Card ${id + 1}`);
    const newValue = 9;
    await userEvent.selectOptions(select, `${newValue}`);

    expect(emitted().handUpdated).toBeDefined();
    expect(emitted().handUpdated).toHaveLength(1);
    expect(emitted().handUpdated[0]).toStrictEqual([{ id, value: newValue }]);
  });
});
