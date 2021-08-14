import { Solver } from './solver';

const solutions = Solver.solve([2, 10, 10, 3]);
for (const output of Solver.print(solutions)) {
  console.log(output);
}
