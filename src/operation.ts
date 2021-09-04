export interface Operation {
  operate(a: number, b: number): number;
  toString(a: unknown, b: unknown): string;
}

export const Add: Operation = {
  operate(a: number, b: number): number {
    return a + b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} + ${b}`;
  },
};

export const Subtract: Operation = {
  operate(a: number, b: number): number {
    return a - b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} - ${b}`;
  },
};

export const Multiply: Operation = {
  operate(a: number, b: number): number {
    return a * b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} * ${b}`;
  },
};

export const Divide: Operation = {
  operate(a: number, b: number): number {
    return a / b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} / ${b}`;
  },
};

export const Exponent: Operation = {
  operate(a: number, b: number): number {
    return a ** b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} ^ ${b}`;
  },
};

export const Log: Operation = {
  operate(a: number, b: number): number {
    return Math.log(b) / Math.log(a);
  },

  toString(a: unknown, b: unknown): string {
    return `log_${a}(${b})`;
  },
};
