import { describe, test, expect } from "vitest";
import { Solver } from "../../src/solver";

describe("Solver", () => {
  describe("solve", () => {
    test("Returns valid solutions", () => {
      const solutions = Solver.solve([2, 3, 10, 10]);
      expect(solutions.length).toBeGreaterThan(0);
    });

    test("Adds extra hands where numbers above 10 are substituted for 10", () => {
      const solutions = Solver.solve([1, 1, 2, 12]);
      const permutations = solutions.map((solution) => solution.solution);
      expect(permutations).toContainEqual([1, 1, 2, 12]);
      expect(permutations).toContainEqual([1, 1, 2, 10]);
    });

    test("Returns empty array when no solutions", () => {
      const solutions = Solver.solve([1, 1, 1, 1]);
      expect(solutions.length).toBe(0);
    });
  });

  describe("print", () => {
    test("Pretty-prints solutions", () => {
      const solutions = Solver.solve([2, 3, 10, 10]);
      const output = Solver.print(solutions);
      expect(solutions.length).toBe(output.length);
      expect(output).toContain("((10 - 3) * 2) + 10");
      expect(output).toContain("(2 ^ 10) - (10 ^ 3)");
    });
  });
});
