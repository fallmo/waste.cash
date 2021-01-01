const { validateCash } = require(".");

test("Cash validation is correct", () => {
  expect(validateCash(3)).toBe(true);
  expect(validateCash("3.00")).toBe(true);
  expect(validateCash("0.1")).toHaveProperty("error");
  expect(validateCash(-3)).toHaveProperty("error");
  expect(validateCash(30.4)).toBe(true);
  expect(validateCash("sadsds")).toHaveProperty("error");
});
