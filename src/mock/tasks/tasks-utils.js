/**
 * Получание случайного логического значения
 * @return {boolean} полученное логическое значение
 */
export const getRandomBoolean = () => Math.random() > 0.5;

/**
 * Получение случайного числа из диапазона
 * @param {Number} max большее число
 * @param {Number} min меньшее число
* @return {Number} полученное случайное число
 */
const getRandomInt = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

/**
 * Получение случайного элемента массива
 * @param {Array} array массив для получения элемента
 * @return {*} случайный элемент
 */
export const getRandomElement = (array) => array[getRandomInt(array.length)];

/**
 * Получение случайной даты
 * @return {Date} полученная дата
 */
export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomInt(8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
