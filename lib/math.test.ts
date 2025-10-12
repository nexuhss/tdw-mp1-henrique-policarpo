import { sum, multiply } from "./math";

describe("Math utilities", () => {
  describe("sum", () => {
    test("adds 1 + 2 to equal 3", () => {
      expect(sum(1, 2)).toBe(3);
    });

    test("adds 0 + 0 to equal 0", () => {
      expect(sum(0, 0)).toBe(0);
    });

    test("adds negative numbers", () => {
      expect(sum(-1, -2)).toBe(-3);
    });
  });

  describe("multiply", () => {
    test("multiplies 2 * 3 to equal 6", () => {
      expect(multiply(2, 3)).toBe(6);
    });

    test("multiplies by 0 to equal 0", () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });
});
