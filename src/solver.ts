import { BaseN, Permutation } from "js-combinatorics";
import * as operations from "./operation";

const ops = [
  operations.Add,
  operations.Subtract,
  operations.Multiply,
  operations.Divide,
  operations.Exponent,
  operations.Log,
];

/**
 * A mathematical expression expressed in Polish notation.
 */
export interface Expression {
  /**
   * The operation to perform on the left and right operands.
   */
  operation: operations.Operation;

  /**
   * The left operand of the operation.
   */
  left: Expression | number;

  /**
   * The right operand of the operation.
   */
  right: Expression | number;
}

/**
 * Given a hand, returns the mathematical combinations that lead to 24 (if any).
 * Hands with cards above 10 are permutated into extra hands where those cards are treated as 10.
 * In other words, a hand of `[1, 1, 2, 13]` is treated as both `[1, 1, 2, 13]` and `[1, 1, 2, 10]`.
 * @param hand The hand to compute solutions for.
 * @returns The solutions as described using Polish notation.
 */
export function solve(hand: number[]): Expression[] {
  const solutions: Expression[] = [];
  const hands: number[][] = [];
  for (let i = 0; i < 2 ** hand.filter((card) => card > 10).length; i++) {
    const newHand: number[] = [];
    let face = 1;
    for (const card of hand) {
      if (card > 10) {
        if ((i / face) % 2 === 0) {
          newHand.push(card);
        } else {
          newHand.push(10);
        }
        face *= 2;
      } else {
        newHand.push(card);
      }
    }
    hands.push(newHand);
  }

  for (const hand of hands) {
    for (const solution of new Permutation(hand)) {
      for (const operations of new BaseN(ops, 3)) {
        // (a b) (c d)
        let left = operations[0].operate(solution[0], solution[1]);
        let right = operations[1].operate(solution[2], solution[3]);
        let answer = operations[2].operate(left, right);
        if (answer === 24) {
          solutions.push({
            operation: operations[2],
            left: {
              operation: operations[0],
              left: solution[0],
              right: solution[1],
            },
            right: {
              operation: operations[1],
              left: solution[2],
              right: solution[3],
            },
          });
        }

        // ((a b) c) d
        left = operations[0].operate(solution[0], solution[1]);
        right = operations[1].operate(left, solution[2]);
        answer = operations[2].operate(right, solution[3]);
        if (answer === 24) {
          solutions.push({
            operation: operations[2],
            left: {
              left: {
                operation: operations[0],
                left: solution[0],
                right: solution[1],
              },
              right: solution[2],
              operation: operations[1],
            },
            right: solution[3],
          });
        }

        // (a (b c)) d
        left = operations[0].operate(solution[1], solution[2]);
        right = operations[1].operate(solution[0], left);
        answer = operations[2].operate(right, solution[3]);
        if (answer === 24) {
          solutions.push({
            operation: operations[2],
            left: {
              operation: operations[1],
              left: solution[0],
              right: {
                operation: operations[0],
                left: solution[1],
                right: solution[2],
              },
            },
            right: solution[3],
          });
        }

        // a ((b c) d)
        left = operations[0].operate(solution[1], solution[2]);
        right = operations[1].operate(left, solution[3]);
        answer = operations[2].operate(solution[0], right);
        if (answer === 24) {
          solutions.push({
            operation: operations[2],
            left: solution[0],
            right: {
              operation: operations[1],
              left: {
                operation: operations[0],
                left: solution[1],
                right: solution[2],
              },
              right: solution[3],
            },
          });
        }

        // a (b (c d))
        left = operations[0].operate(solution[2], solution[3]);
        right = operations[1].operate(solution[1], left);
        answer = operations[2].operate(solution[0], right);
        if (answer === 24) {
          solutions.push({
            operation: operations[2],
            left: solution[0],
            right: {
              operation: operations[1],
              left: solution[1],
              right: {
                operation: operations[0],
                left: solution[2],
                right: solution[3],
              },
            },
          });
        }
      }
    }
  }
  return solutions;
}
