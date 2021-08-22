#!/bin/python

from solver import Solver

solver = Solver()

gameplay = input("Do you want to...\n\t0 - Play 24\n\t1 - Check solutions\n")

while True:
    if gameplay == "0":  # play 24!
        print()
        print("If you think there are no solutions, enter 'none'")
        print("Next Hand: " + " ".join([str(c) for c in solver.get_next_hand()]))
        keep_trying = True

        while keep_trying:
            solution = input("Solution: ")

            if solution == 'none':
                keep_trying = False
                break

            if solver.check_solution(solution):
                print("Well done!")
                break
            else:
                keep_trying = input("Not quite. Want to try again? y/n ") == "y"

        if not keep_trying:
            solutions = solver.get_solutions()

            if solutions is None:
                print("Well done! There are no solutions")
            else:
                input("Solutions exist. Type any key to view them ")
                Solver.print_solutions(solutions)

    else:  # check solutions
        solver.set_hand(input("Enter cards: "))
        solutions = solver.get_solutions()
        if solutions is None:
            print("There are no solutions")
        else:
            input("Solutions exist. Type any key to view them ")
            Solver.print_solutions(solutions)
