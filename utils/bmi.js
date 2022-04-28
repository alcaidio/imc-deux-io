/**
 * @description This function take the size in cm and weight in kg to return the Body Mass Index
 * @param {number} size
 * @param {number} weight
 * @returns {number}
 */
export function computeBMI(size, weight) {
  const sizeInMeter = size / 100;
  const bmi = weight / (sizeInMeter * sizeInMeter);
  return +bmi.toFixed(2);
}

/**
 * @description This function return the medical verdic based on BMI
 * @param {number} bmi
 * @returns {string}
 */
export function BMIVerdict(bmi) {
  const b = parseInt(bmi);
  if (b < 16.5) return "Starvation";
  if (b >= 16.5 && b < 18.5) return "Thin";
  if (b >= 18.5 && b < 25) return "Normal weight";
  if (b >= 25 && b < 30) return "Overweight";
  if (b >= 30 && b < 35) return "Moderate obesity";
  if (b >= 35 && b < 40) return "Severe obesity";
  return "Morbid or massive obesity";
}
