import { describe, test, expect } from "vitest";
import { page } from "vitest/browser";
import Card from "../../src/components/Card.vue";

describe("Card", () => {
  const props = {
    id: 1,
    rank: 3,
    suit: "hearts" as "hearts" | "diamonds" | "clubs" | "spades",
  };

  test("Renders a card", () => {
    const screen = page.render(Card, { props });

    screen.getByTestId("card");
  });

  test("Includes a title", () => {
    const screen = page.render(Card, { props });

    const card = screen.getByTestId("card");
    const title = card.element().getElementsByTagName("title")[0];
    expect(title?.innerHTML).toBe("3 of Hearts");
  });

  test("Transforms ranks to human-readable mappings", async () => {
    const screen = page.render(Card, { props: { ...props, rank: 11 } });

    {
      const card = screen.getByTestId("card");
      const title = card.element().getElementsByTagName("title")[0];
      console.log(card.element().getElementsByTagName("title")[0].innerHTML);
      expect(title.innerHTML).toBe("Jack of Hearts");
    }

    await screen.rerender({ ...props, rank: 1 });

    {
      const card = screen.getByTestId("card");
      const title = card.element().getElementsByTagName("title")[0];
      console.log(card.element().getElementsByTagName("title")[0].innerHTML);
      expect(title.innerHTML).toBe("Ace of Hearts");
    }
  });
});
