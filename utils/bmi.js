/**
 * @description This function take the size in cm and weight in kg to return the Body Mass Index
 * @param {number} size
 * @param {number} weight
 * @returns {number}
 */
export default function computeBMI(size, weight) {
  const sizeInMeter = size / 100;
  const bmi = weight / (sizeInMeter * sizeInMeter);
  return +bmi.toFixed(2);
}
