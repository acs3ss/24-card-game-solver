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
  });

  describe("Subtract", () => {
    test("Subtracts b from a", () => {
      expect(Subtract.operate(2, 5)).toBe(2 - 5);
    });
  });

  describe("Multiply", () => {
    test("Multiplies numbers together", () => {
      expect(Multiply.operate(2, 5)).toBe(2 * 5);
    });
  });

  describe("Divide", () => {
    test("Divides a by b", () => {
      expect(Divide.operate(2, 5)).toBe(2 / 5);
    });
  });

  describe("Exponent", () => {
    test("Raises a to the b power", () => {
      expect(Exponent.operate(2, 5)).toBe(2 ** 5);
    });
  });

  describe("Log", () => {
    test("Performs log_a(b)", () => {
      expect(Log.operate(2, 8)).toBe(3);
    });
  });
});
