import computeBMI from "./bmi";

test("should return the right body mass indice", () => {
  expect(computeBMI(168, 60)).toBe(21.26);
  expect(computeBMI(178, 48)).toBe(15.15);
  expect(computeBMI(179, 62)).toBe(19.35);
});
