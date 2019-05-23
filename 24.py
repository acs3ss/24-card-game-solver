import random
import parser
import re
import math
import itertools

class Deck:
    
    def __init__(self):
        self.cards = list(range(2, 11)) + ['J', 'Q', 'K', 'A']
        self.num_re = re.compile(r'\d+')
        self.card_re = re.compile(r'[1-9JQKA]0?')
        self.hand = []

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


    # oper is an integer between 0 and 5, inclusive
    def do_operation(self, n1, n2, oper):
        if oper == 0:
            return float(n1) + float(n2)
        elif oper == 1:
            return float(n1) - float(n2)
        elif oper == 2:
            return float(n1) * float(n2)
        elif oper == 3:
            return float(n1) / float(n2)
        elif oper == 4:
            return float(n1) ** float(n2)
        else:
            return math.log(float(n1), float(n2))

    def get_solutions(self):
        hands = []
        solutions = []
        hand = [x if x is not "A" else "1" for x in self.hand]  # replace all Aces with 1
        facecards = [x for x in hand if not x.isdigit()]

        for i in range(2**len(facecards)):
            new_hand = []
            face = 1
            for card in hand:
                if not card.isdigit():
                    if card is "J":
                        new_hand.append("11" if (i // face) % 2 == 0 else "10")
                    elif card is "Q":
                        new_hand.append("12" if (i // face) % 2 == 0 else "10")
                    else:  # K
                        new_hand.append("13" if (i // face) % 2 == 0 else "10")
                    face *= 2
                else:
                    new_hand.append(card)
            hands.append(new_hand)

        for hand in hands:
            potential_solutions = list(itertools.permutations(hand))
            for solution in potential_solutions:  # for all possible card combinations...
                for j in range(6*6*6):  # for all possible operation combinations...
                    try:
                        # (a b) (c d)
                        left = self.do_operation(solution[0], solution[1], j % 6)
                        right = self.do_operation(solution[2], solution[3], (j // 6) % 6)
                        answer = self.do_operation(left, right, j // 36)
                        if answer == 24:
                            solutions.append((j, 0, solution))
                    except:
                        pass
                    try:
                        # ((a b) c) d
                        left = self.do_operation(solution[0], solution[1], j % 6)
                        right = self.do_operation(left, solution[2], (j // 6) % 6)
                        answer = self.do_operation(right, solution[3], j // 36)
                        if answer == 24:
                            solutions.append((j, 1, solution))
                    except:
                        pass
                    try:
                        # (a (b c)) d
                        left = self.do_operation(solution[1], solution[2], j % 6)
                        right = self.do_operation(solution[0], left (j // 6) % 6)
                        answer = self.do_operation(right, solution[3], j // 36)
                        if answer == 24:
                            solutions.append((j, 2, solution))
                    except:
                        pass
                    try:
                        # a ((b c) d)
                        left = self.do_operation(solution[1], solution[2], j % 6)
                        right = self.do_operation(left, solution[3], (j // 6) % 6)
                        answer = self.do_operation(solution[0], right, j // 36)
                        if answer == 24:
                            solutions.append((j, 3, solution))
                    except:
                        pass
                    try:
                        # a (b (c d))
                        left = self.do_operation(solution[2], solution[3], j % 6)
                        right = self.do_operation(solution[1], left, (j // 6) % 6)
                        answer = self.do_operation(solution[0], right, j // 36)
                        if answer == 24:
                            solutions.append((j, 4, solution))
                    except:
                        pass
        return None if len(solutions) == 0 else list(set(solutions))

    def check_solution(self, solution):
        nums = self.num_re.findall(solution)

        # must input 4 numbers
        if len(nums) != len(self.cards):
            print("ERROR: must use all 4 numbers")
            return False

        card_copy = self.hand.copy()
        
        for card in nums:
            if card in hand_copy:
                hand_copy.remove(card)
            else:
                # used card which doesn't match
                print("ERROR: invalid use of card", card)
                return False

        code = parser.expr(solution).compile()
        return eval(code) == 24

def format_operation(n1, n2, oper):
    if oper == 0:
        return n1 + " + " + n2
    elif oper == 1:
        return n1 + " - " + n2
    elif oper == 2:
        return n1 + " * " + n2
    elif oper == 3:
        return n1 + " / " + n2
    elif oper == 4:
        return n1 + " ^ " + n2
    else:
        return "log_" + n1 + "(" + n2 + ")"

def print_solutions(solutions):
    for solution in solutions:
        oper = solution[0]
        parens = solution[1]
        cards  = solution[2]
        if parens == 0:  # (a b) (c d)
            left   = "(" + format_operation(cards[0], cards[1], oper % 6) + ")"
            right  = "(" + format_operation(cards[2], cards[3], (oper // 6) % 6) + ")"
            output = format_operation(left, right, oper // 36)
        elif parens == 1:  # ((a b) c) d
            left   = "(" + format_operation(cards[0], cards[1], oper % 6) + ")"
            right  = "(" + format_operation(left, cards[2], (oper // 6) % 6) + ")"
            output = format_operation(right, cards[3], oper // 36)
        elif parens == 2:  # (a (b c)) d
            left   = "(" + format_operation(cards[1], cards[2], oper % 6) + ")"
            right  = "(" + format_operation(cards[0], left (oper // 6) % 6) + ")"
            output = format_operation(right, cards[3], oper // 36)
        elif parens == 3:  # a ((b c) d)
            left   = "(" + format_operation(cards[1], cards[2], oper % 6) + ")"
            right  = "(" + format_operation(left, cards[3], (oper // 6) % 6) + ")"
            output = format_operation(cards[0], right, oper // 36)
        else:  # a (b (c d))
            left   = "(" + format_operation(cards[2], cards[3], oper % 6) + ")"
            right  = "(" + format_operation(cards[1], left, (oper // 6) % 6) + ")"
            output = format_operation(cards[0], right, oper // 36)
        
        print(output)


deck = Deck()

# gameplay = input("Do you want to...\n\t0 - Play 24\n\t1 - Check solutions\n")

while True:
    # if gameplay == 0:
    #     print("Next hand:")
    #     print(deck.get_next_hand())
    # 
    #     solution = input("Solution: ")
    #     print("Correct?", deck.check_solution(solution))
    # 
    # else:
    deck.set_hand(input("Enter cards: "))
    solutions = deck.get_solutions()
    if solutions is None:
        print("There are no solutions")
    else:
        input("Solutions exist. Type any key to view them ")
        print_solutions(solutions)
