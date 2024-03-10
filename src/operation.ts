export interface Operation {
  priority: number;

  operate(a: number, b: number): number;
  toString(a: unknown, b: unknown): string;
}

export const Add: Operation = {
  priority: 0,

  operate(a: number, b: number): number {
    return a + b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} + ${b}`;
  },
};

export const Subtract: Operation = {
  priority: 0,

  operate(a: number, b: number): number {
    return a - b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} - ${b}`;
  },
};

export const Multiply: Operation = {
  priority: 1,

  operate(a: number, b: number): number {
    return a * b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} * ${b}`;
  },
};

export const Divide: Operation = {
  priority: 1,

  operate(a: number, b: number): number {
    return a / b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} / ${b}`;
  },
};

export const Exponent: Operation = {
  priority: 2,

  operate(a: number, b: number): number {
    return a ** b;
  },

  toString(a: unknown, b: unknown): string {
    return `${a} ^ ${b}`;
  },
};

export const Log: Operation = {
  priority: 2,

  operate(a: number, b: number): number {
    return Math.log(b) / Math.log(a);
  },

  toString(a: unknown, b: unknown): string {
    return `log_${a}(${b})`;
  },
};
