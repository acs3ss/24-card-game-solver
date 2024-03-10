import { describe, test, expect } from "vitest";
import { solve, type Expression } from "../../src/solver";

describe("Solver", () => {
  describe("solve", () => {
    test("Returns valid solutions", () => {
      const solutions = solve([2, 3, 10, 10]);
      expect(solutions.length).toBeGreaterThan(0);
    });

    test("Adds extra hands where numbers above 10 are substituted for 10", () => {
      const solutions = solve([1, 1, 2, 12]);

      const getNumbersFromExpression = (expression: Expression): number[] => {
        const numbers = [];
        if (typeof expression.left !== "number") {
          numbers.push(...getNumbersFromExpression(expression.left));
        } else {
          numbers.push(expression.left);
        }

        if (typeof expression.right !== "number") {
          numbers.push(...getNumbersFromExpression(expression.right));
        } else {
          numbers.push(expression.right);
        }

        return numbers;
      };

      const permutations = solutions.map((expression) =>
        getNumbersFromExpression(expression),
      );
      expect(permutations).toContainEqual([1, 1, 2, 12]);
      expect(permutations).toContainEqual([1, 1, 2, 10]);
    });

    test("Returns empty array when no solutions", () => {
      const solutions = solve([1, 1, 1, 1]);
      expect(solutions.length).toBe(0);
    });
  });
});
