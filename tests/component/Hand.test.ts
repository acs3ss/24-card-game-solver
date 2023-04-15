import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, describe, expect, test } from "vitest";
import Hand from "../../src/components/Hand.vue";

describe("Hand", () => {
  const props = {
    hand: [5, 3, 7, 8],
    colorScheme: "light",
  };

  afterEach(() => {
    cleanup();
  });

  test("Renders four CardPickers", () => {
    render(Hand, { props });

    const cards = screen.getAllByLabelText<HTMLSelectElement>("Card ", {
      exact: false,
    });
    expect(cards).toHaveLength(props.hand.length);

    for (let i = 0; i < props.hand.length; i++) {
      expect(cards[i].value).toStrictEqual(`${props.hand[i]}`);
    }
  });

  test("Emits event when new card is selected", async () => {
    const { emitted } = render(Hand, { props });

    expect(emitted()).to.be.empty;

    const id = 0;
    const select = screen.getByLabelText<HTMLSelectElement>(`Card ${id + 1}`);
    const newValue = 9;
    await fireEvent.update(select, `${newValue}`);

    expect(emitted().handUpdated).toBeDefined();
    expect(emitted().handUpdated).toHaveLength(1);
    expect(emitted().handUpdated[0]).toStrictEqual([{ id, value: newValue }]);
  });
});
