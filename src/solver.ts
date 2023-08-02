import { BaseN, Permutation } from "js-combinatorics";
import * as operations from "./operation";

// interface Solution {
//   operations: operations.Operation[];
//   parentheses: 0 | 1 | 2 | 3 | 4;
//   solution: number[];
// }

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
  // const solutions: Solution[] = [];
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
          // solutions.push({
          //   operations,
          //   parentheses: 0,
          //   solution,
          // });
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
          // solutions.push({
          //   operations,
          //   parentheses: 1,
          //   solution,
          // });
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
          // solutions.push({
          //   operations,
          //   parentheses: 2,
          //   solution,
          // });
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
          // solutions.push({
          //   operations,
          //   parentheses: 3,
          //   solution,
          // });
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
          // solutions.push({
          //   operations,
          //   parentheses: 4,
          //   solution,
          // });
        }
      }
    }
  }
  return solutions;
}

// export function print(solutions: Solution[]): string[] {
//   const outputs: string[] = [];
//   for (const { operations, parentheses, solution } of solutions) {
//     if (parentheses === 0) {
//       // (a b) (c d)
//       const left = `(${operations[0].toString(solution[0], solution[1])})`;
//       const right = `(${operations[1].toString(solution[2], solution[3])})`;
//       outputs.push(operations[2].toString(left, right));
//     } else if (parentheses === 1) {
//       // ((a b) c) d
//       const left = `(${operations[0].toString(solution[0], solution[1])})`;
//       const right = `(${operations[1].toString(left, solution[2])})`;
//       outputs.push(operations[2].toString(right, solution[3]));
//     } else if (parentheses === 2) {
//       // (a (b c)) d
//       const left = `(${operations[0].toString(solution[1], solution[2])})`;
//       const right = `(${operations[1].toString(solution[0], left)})`;
//       outputs.push(operations[2].toString(right, solution[3]));
//     } else if (parentheses === 3) {
//       // a ((b c) d)
//       const left = `(${operations[0].toString(solution[1], solution[2])})`;
//       const right = `(${operations[1].toString(left, solution[3])})`;
//       outputs.push(operations[2].toString(solution[0], right));
//     } else if (parentheses === 4) {
//       // a (b (c d))
//       const left = `(${operations[0].toString(solution[2], solution[3])})`;
//       const right = `(${operations[1].toString(solution[1], left)})`;
//       outputs.push(operations[2].toString(solution[0], right));
//     }
//   }
//   return outputs;
// }
