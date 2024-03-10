import { describe, test, expect } from "vitest";
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

    test("Has the same priority as Subtract", () => {
      expect(Add.priority).toBe(Subtract.priority);
    });

    test("Has a lower priority than Multiply", () => {
      expect(Add.priority).toBeLessThan(Multiply.priority);
    });
  });

  describe("Subtract", () => {
    test("Subtracts b from a", () => {
      expect(Subtract.operate(2, 5)).toBe(2 - 5);
    });

    test("Has the same priority as Add", () => {
      expect(Subtract.priority).toBe(Add.priority);
    });

    test("Has a lower priority than Multiply", () => {
      expect(Add.priority).toBeLessThan(Multiply.priority);
    });
  });

  describe("Multiply", () => {
    test("Multiplies numbers together", () => {
      expect(Multiply.operate(2, 5)).toBe(2 * 5);
    });

    test("Has a higher priority than Add", () => {
      expect(Multiply.priority).toBeGreaterThan(Add.priority);
    });

    test("Has the same priority as Divide", () => {
      expect(Multiply.priority).toBe(Divide.priority);
    });

    test("Has a lower priority than Exponent", () => {
      expect(Multiply.priority).toBeLessThan(Exponent.priority);
    });
  });

  describe("Divide", () => {
    test("Divides a by b", () => {
      expect(Divide.operate(2, 5)).toBe(2 / 5);
    });

    test("Has a higher priority than Add", () => {
      expect(Divide.priority).toBeGreaterThan(Add.priority);
    });

    test("Has the same priority as Multiply", () => {
      expect(Divide.priority).toBe(Multiply.priority);
    });

    test("Has a lower priority than Exponent", () => {
      expect(Divide.priority).toBeLessThan(Exponent.priority);
    });
  });

  describe("Exponent", () => {
    test("Raises a to the b power", () => {
      expect(Exponent.operate(2, 5)).toBe(2 ** 5);
    });

    test("Has the same priority as Log", () => {
      expect(Exponent.priority).toBe(Log.priority);
    });

    test("Has a higher priority than Multiply", () => {
      expect(Exponent.priority).toBeGreaterThan(Multiply.priority);
    });
  });

  describe("Log", () => {
    test("Performs log_a(b)", () => {
      expect(Log.operate(2, 8)).toBe(3);
    });

    test("Has the same priority as Exponent", () => {
      expect(Log.priority).toBe(Exponent.priority);
    });

    test("Has a higher priority than Multiply", () => {
      expect(Log.priority).toBeGreaterThan(Multiply.priority);
    });
  });
});
