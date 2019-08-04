#!/bin/python


# for iterating through all combinations of n copies of a list
class Combinatorial:
    def __init__(self, source, copies):
        self.source = source
        self.source_length = len(source)
        self.copies = copies
        self.tally = 0
        self.max = self.source_length**self.copies

    def next(self):
        self.tally += 1
        return self.tally < self.max

    def get_item(self, i):
        return self.source[i]

    def get_items(self):
        output = []
        # iterating in reverse increments the output list more intuitively
        for i in range(self.copies)[::-1]:
            output += [self.get_item((self.tally // self.source_length**i) % self.source_length)]
        return output
