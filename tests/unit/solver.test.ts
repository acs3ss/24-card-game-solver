import { describe, test, expect } from "vitest";
import { solve } from "../../src/solver";

describe("Solver", () => {
  describe("solve", () => {
    test("Returns valid solutions", () => {
      const solutions = solve([2, 3, 10, 10]);
      expect(solutions.length).toBeGreaterThan(0);
    });

    test("Adds extra hands where numbers above 10 are substituted for 10", () => {
      const solutions = solve([1, 1, 2, 12]);
      const permutations = solutions.map((solution) => solution.solution);
      expect(permutations).toContainEqual([1, 1, 2, 12]);
      expect(permutations).toContainEqual([1, 1, 2, 10]);
    });

    test("Returns empty array when no solutions", () => {
      const solutions = solve([1, 1, 1, 1]);
      expect(solutions.length).toBe(0);
    });
  });
});
