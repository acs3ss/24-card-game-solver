#!/bin/python
import random
import parser
import re
import math
import itertools
from combinatorial import Combinatorial
import operation


class Solver:
    def __init__(self):
        self.cards = list(range(2, 11)) + ['J', 'Q', 'K', 'A']
        self.card_re = re.compile(r'[1-9JQKA]0?')
        self.hand = []
        # choose the operations you're interested in supporting...
        self.ops = [operation.Add, operation.Subtract, operation.Multiply,
                    operation.Divide, operation.Exponent, operation.Log]

    def get_next_hand(self):
        self.hand = [random.choice(self.cards) for x in range(4)]
        return self.hand

    def set_hand(self, card_str):
        cards = self.card_re.findall(card_str)

        # must input 4 cards
        if len(cards) != 4:
            print("ERROR: please enter 4 cards")
            return None

        self.hand = cards

    def get_solutions(self):
        hands = []
        solutions = []
        hand = [x if x is not "A" else 1 for x in self.hand]  # replace all Aces with 1
        facecards = [x for x in hand if not str(x).isdigit()]

        for i in range(2**len(facecards)):
            new_hand = []
            face = 1
            for card in hand:
                if not str(card).isdigit():
                    if card is "J":
                        new_hand.append(11 if (i // face) % 2 == 0 else 10)
                    elif card is "Q":
                        new_hand.append(12 if (i // face) % 2 == 0 else 10)
                    else:  # K
                        new_hand.append(13 if (i // face) % 2 == 0 else 10)
                    face *= 2
                else:
                    new_hand.append(int(card))
            hands.append(new_hand)

        for hand in hands:
            potential_solutions = list(itertools.permutations(hand))
            for solution in potential_solutions:  # for all possible card combinations...
                c = Combinatorial(self.ops, 3)
                while c.next():  # for all possible operation combinations...
                    opers = c.get_items()
                    try:
                        # (a b) (c d)
                        left = opers[0].operate(solution[0], solution[1])
                        right = opers[1].operate(solution[2], solution[3])
                        answer = opers[2].operate(left, right)
                        if answer == 24:
                            solutions.append((opers, 0, solution))
                    except Exception as e:
                        pass  # it's definitely not a valid solution if there's overflow, divide by zero, etc
                    try:
                        # ((a b) c) d
                        left = opers[0].operate(solution[0], solution[1])
                        right = opers[1].operate(left, solution[2])
                        answer = opers[2].operate(right, solution[3])
                        if answer == 24:
                            solutions.append((opers, 1, solution))
                    except Exception as e:
                        pass  # it's definitely not a valid solution if there's overflow, divide by zero, etc
                    try:
                        # (a (b c)) d
                        left = opers[0].operate(solution[1], solution[2])
                        right = opers[1].operate(solution[0], left)
                        answer = opers[2].operate(right, solution[3])
                        if answer == 24:
                            solutions.append((opers, 2, solution))
                    except Exception as e:
                        pass  # it's definitely not a valid solution if there's overflow, divide by zero, etc
                    try:
                        # a ((b c) d)
                        left = opers[0].operate(solution[1], solution[2])
                        right = opers[1].operate(left, solution[3])
                        answer = opers[2].operate(solution[0], right)
                        if answer == 24:
                            solutions.append((opers, 3, solution))
                    except Exception as e:
                        pass  # it's definitely not a valid solution if there's overflow, divide by zero, etc
                    try:
                        # a (b (c d))
                        left = opers[0].operate(solution[2], solution[3])
                        right = opers[1].operate(solution[1], left)
                        answer = opers[2].operate(solution[0], right)
                        if answer == 24:
                            solutions.append((opers, 4, solution))
                    except Exception as e:
                        pass  # it's definitely not a valid solution if there's overflow, divide by zero, etc
        return None if len(solutions) == 0 else solutions

    def check_solution(self, solution):
        cards = self.card_re.findall(solution)

        # must input 4 numbers
        if len(cards) != 4:
            print("ERROR: must use all 4 numbers")
            return False

        card_copy = [str(c) for c in self.hand]

        for card in [str(c) for c in cards]:
            if card in card_copy:
                card_copy.remove(card)
            else:
                # used card which doesn't match
                print("ERROR: invalid use of card", card)
                return False

        hands = []
        solution = solution.replace('A', "1")
        facecards = [c for c in [str(c) for c in cards] if not c.isdigit()]
        for i in range(2**len(facecards)):
            new_hand = solution
            face = 1
            for card in facecards:
                if card is "J":
                    new_hand = new_hand.replace("J", "11" if (i // face) % 2 == 0 else "10")
                elif card is "Q":
                    new_hand = new_hand.replace("Q", "12" if (i // face) % 2 == 0 else "10")
                else:  # K
                    new_hand = new_hand.replace("K", "13" if (i // face) % 2 == 0 else "10")
                face *= 2
            hands.append(new_hand)

        for hand in hands:
            try:
                code = parser.expr(hand).compile()
                if eval(code) == 24:
                    return True
            except Exception as e:
                print(e)
        return False

    def print_solutions(solutions):
        for solution in solutions:
            oper = solution[0]
            parens = solution[1]
            cards = solution[2]
            if parens == 0:  # (a b) (c d)
                left = "(" + oper[0].to_string(cards[0], cards[1]) + ")"
                right = "(" + oper[1].to_string(cards[2], cards[3]) + ")"
                output = oper[2].to_string(left, right)
            elif parens == 1:  # ((a b) c) d
                left = "(" + oper[0].to_string(cards[0], cards[1]) + ")"
                right = "(" + oper[1].to_string(left, cards[2]) + ")"
                output = oper[2].to_string(right, cards[3])
            elif parens == 2:  # (a (b c)) d
                left = "(" + oper[0].to_string(cards[1], cards[2]) + ")"
                right = "(" + oper[1].to_string(cards[0], left) + ")"
                output = oper[2].to_string(right, cards[3])
            elif parens == 3:  # a ((b c) d)
                left = "(" + oper[0].to_string(cards[1], cards[2]) + ")"
                right = "(" + oper[1].to_string(left, cards[3]) + ")"
                output = oper[2].to_string(cards[0], right)
            else:  # a (b (c d))
                left = "(" + oper[0].to_string(cards[2], cards[3]) + ")"
                right = "(" + oper[1].to_string(cards[1], left) + ")"
                output = oper[2].to_string(cards[0], right)

            print(output)
