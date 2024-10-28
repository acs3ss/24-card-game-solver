import { BaseN, Permutation } from "js-combinatorics";
import * as operations from "./operation";

interface Solution {
  operations: operations.Operation[];
  parentheses: 0 | 1 | 2 | 3 | 4;
  solution: number[];
}

const ops = [
  operations.Add,
  operations.Subtract,
  operations.Multiply,
  operations.Divide,
  operations.Exponent,
  operations.Log,
];

export function solve(hand: number[]): Solution[] {
  const solutions: Solution[] = [];
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
            operations,
            parentheses: 0,
            solution,
          });
        }

        // ((a b) c) d
        left = operations[0].operate(solution[0], solution[1]);
        right = operations[1].operate(left, solution[2]);
        answer = operations[2].operate(right, solution[3]);
        if (answer === 24) {
          solutions.push({
            operations,
            parentheses: 1,
            solution,
          });
        }

        // (a (b c)) d
        left = operations[0].operate(solution[1], solution[2]);
        right = operations[1].operate(solution[0], left);
        answer = operations[2].operate(right, solution[3]);
        if (answer === 24) {
          solutions.push({
            operations,
            parentheses: 2,
            solution,
          });
        }

        // a ((b c) d)
        left = operations[0].operate(solution[1], solution[2]);
        right = operations[1].operate(left, solution[3]);
        answer = operations[2].operate(solution[0], right);
        if (answer == 24) {
          solutions.push({
            operations,
            parentheses: 3,
            solution,
          });
        }

        // a (b (c d))
        left = operations[0].operate(solution[2], solution[3]);
        right = operations[1].operate(solution[1], left);
        answer = operations[2].operate(solution[0], right);
        if (answer === 24) {
          solutions.push({
            operations,
            parentheses: 4,
            solution,
          });
        }
      }
    }
  }
  return solutions;
}

export function print(solutions: Solution[]): string[] {
  const outputs: string[] = [];
  for (const { operations, parentheses, solution } of solutions) {
    if (parentheses === 0) {
      // (a b) (c d)
      const left = `(${operations[0].toString(solution[0], solution[1])})`;
      const right = `(${operations[1].toString(solution[2], solution[3])})`;
      outputs.push(operations[2].toString(left, right));
    } else if (parentheses === 1) {
      // ((a b) c) d
      const left = `(${operations[0].toString(solution[0], solution[1])})`;
      const right = `(${operations[1].toString(left, solution[2])})`;
      outputs.push(operations[2].toString(right, solution[3]));
    } else if (parentheses === 2) {
      // (a (b c)) d
      const left = `(${operations[0].toString(solution[1], solution[2])})`;
      const right = `(${operations[1].toString(solution[0], left)})`;
      outputs.push(operations[2].toString(right, solution[3]));
    } else if (parentheses === 3) {
      // a ((b c) d)
      const left = `(${operations[0].toString(solution[1], solution[2])})`;
      const right = `(${operations[1].toString(left, solution[3])})`;
      outputs.push(operations[2].toString(solution[0], right));
    } else {
      // a (b (c d))
      const left = `(${operations[0].toString(solution[2], solution[3])})`;
      const right = `(${operations[1].toString(solution[1], left)})`;
      outputs.push(operations[2].toString(solution[0], right));
    }
  }
  return outputs;
}
