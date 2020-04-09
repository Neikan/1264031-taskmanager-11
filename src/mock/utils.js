/**
 * Получание случайного логического значения
 * @return {boolean} полученное логическое значение
 */
export const getRandomBoolean = () => Math.random() > 0.5;

/**
 * Получение случайного числа из диапазона
 * @param {Number} min меньшее число
 * @param {Number} max большее число
 * @return {Number} полученное случайное число
 */
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

/**
 * Получение случайного элемента массива
 * @param {Array} array массив для получения элемента
 * @return {*} случайный элемент
 */
export const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length)];
};

/**
 * Получение случайной даты
 * @return {Date} полученная дата
 */
export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
