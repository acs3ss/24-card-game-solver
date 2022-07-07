import {
  Add,
  Subtract,
  Multiply,
  Divide,
  Exponent,
  Log,
} from "../../src/operation";

describe("Operations", () => {
  describe("Add", () => {
    test("Adds numbers together", () => {
      expect(Add.operate(2, 5)).toBe(2 + 5);
    });

    describe("toString", () => {
      test("Uses + symbol", () => {
        expect(Add.toString(2, 5)).toBe("2 + 5");
      });

      test("Joins strings with +", () => {
        expect(Add.toString("(2 - 1)", "(3 * 4)")).toBe("(2 - 1) + (3 * 4)");
      });
    });
  });

  describe("Subtract", () => {
    test("Subtracts b from a", () => {
      expect(Subtract.operate(2, 5)).toBe(2 - 5);
    });

    describe("toString", () => {
      test("Uses - symbol", () => {
        expect(Subtract.toString(2, 5)).toBe("2 - 5");
      });

      test("Joins strings with -", () => {
        expect(Subtract.toString("(2 + 1)", "(3 * 4)")).toBe(
          "(2 + 1) - (3 * 4)"
        );
      });
    });
  });

  describe("Multiply", () => {
    test("Multiplies numbers together", () => {
      expect(Multiply.operate(2, 5)).toBe(2 * 5);
    });

    describe("toString", () => {
      test("Uses * symbol", () => {
        expect(Multiply.toString(2, 5)).toBe("2 * 5");
      });

      test("Joins strings with *", () => {
        expect(Multiply.toString("(2 - 1)", "(3 / 4)")).toBe(
          "(2 - 1) * (3 / 4)"
        );
      });
    });
  });

  describe("Divide", () => {
    test("Divides a by b", () => {
      expect(Divide.operate(2, 5)).toBe(2 / 5);
    });

    describe("toString", () => {
      test("Uses / symbol", () => {
        expect(Divide.toString(2, 5)).toBe("2 / 5");
      });

      test("Joins strings with /", () => {
        expect(Divide.toString("(2 - 1)", "(3 * 4)")).toBe("(2 - 1) / (3 * 4)");
      });
    });
  });

  describe("Exponent", () => {
    test("Raises a to the b power", () => {
      expect(Exponent.operate(2, 5)).toBe(2 ** 5);
    });

    describe("toString", () => {
      test("Uses ^ symbol", () => {
        expect(Exponent.toString(2, 5)).toBe("2 ^ 5");
      });

      test("Joins strings with ^", () => {
        expect(Exponent.toString("(2 - 1)", "(3 * 4)")).toBe(
          "(2 - 1) ^ (3 * 4)"
        );
      });
    });
  });

  describe("Log", () => {
    test("Performs log_a(b)", () => {
      expect(Log.operate(2, 8)).toBe(3);
    });

    describe("toString", () => {
      test("Uses log_a(b) notation", () => {
        expect(Log.toString(2, 5)).toBe("log_2(5)");
      });

      test("Places arguments in the corresponding position", () => {
        expect(Log.toString("(2 - 1)", "(3 * 4)")).toBe("log_(2 - 1)((3 * 4))");
      });
    });
  });
});
