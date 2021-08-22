import math
import abc


class Operation(abc.ABC):
    @abc.abstractstaticmethod
    def operate(a, b):
        pass

    @abc.abstractstaticmethod
    def to_string(a, b):
        pass


class Add(Operation):
    def operate(a, b):
        return a + b

    def to_string(a, b):
        return str(a) + " + " + str(b)


class Subtract(Operation):
    def operate(a, b):
        return a - b

    def to_string(a, b):
        return str(a) + " - " + str(b)


class Multiply(Operation):
    def operate(a, b):
        return a * b

    def to_string(a, b):
        return str(a) + " * " + str(b)


class Divide(Operation):
    def operate(a, b):
        return a / b

    def to_string(a, b):
        return str(a) + " / " + str(b)


class Exponent(Operation):
    def operate(a, b):
        # for some reason, python detects numeric overflow floats, but not ints
        return a ** float(b)

    def to_string(a, b):
        return str(a) + " ^ " + str(b)


class Log(Operation):
    def operate(a, b):
        return math.log(a, b)

    def to_string(a, b):
        return "log_" + str(a) + "(" + str(b) + ")"
