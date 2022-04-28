import { BMIVerdict, computeBMI } from "./bmi";

describe("Utils > BMI", () => {
  test("function computeBMI should return the right body mass indice", () => {
    expect(computeBMI(168, 60)).toBe(21.26);
    expect(computeBMI(178, 48)).toBe(15.15);
    expect(computeBMI(179, 62)).toBe(19.35);
  });

  test("function BMIVerdict should return the right verdict", () => {
    expect(BMIVerdict(16)).toBe("Starvation");
    expect(BMIVerdict(18)).toBe("Thin");
    expect(BMIVerdict(24)).toBe("Normal weight");
    expect(BMIVerdict(28)).toBe("Overweight");
    expect(BMIVerdict(34)).toBe("Moderate obesity");
    expect(BMIVerdict(38)).toBe("Severe obesity");
    expect(BMIVerdict(42)).toBe("Morbid or massive obesity");
  });
});
