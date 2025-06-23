import { afterEach, describe, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/vue";
import Card from "../../src/components/Card.vue";

describe("Card", () => {
  const props = {
    id: 1,
    rank: 3,
    suit: "hearts" as "hearts" | "diamonds" | "clubs" | "spades",
  };

  afterEach(() => {
    cleanup();
  });

  test("Renders a card", () => {
    render(Card, { props });

    screen.getByTestId("card");
  });

  test("Includes a title", () => {
    render(Card, { props });

    const card = screen.getByTestId("card");
    const title = card.getElementsByTagName("title")[0];
    expect(title.innerHTML).toBe("3 of Hearts");
  });

  test("Transforms ranks to human-readable mappings", async () => {
    const { rerender } = render(Card, { props: { ...props, rank: 11 } });

    {
      const card = screen.getByTestId("card");
      const title = card.getElementsByTagName("title")[0];
      expect(title.innerHTML).toBe("Jack of Hearts");
    }

    await rerender({ ...props, rank: 1 });

    {
      const card = screen.getByTestId("card");
      const title = card.getElementsByTagName("title")[0];
      expect(title.innerHTML).toBe("Ace of Hearts");
    }
  });
});
