import {DAYS} from "../../consts";
import {Sign, DAYS_OF_WEEK, DefaultRepeatingDays} from "./tasks-consts";

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
  const sign = getRandomBoolean() ? Sign.PLUS : Sign.MINUS;
  const diffValue = sign * getRandomInt(DAYS_OF_WEEK);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

/**
  * Получение дня повторения задачи
  * @param {Array} days дни
  * @param {string} day день
  * @return {Object} день повторений
  */
const getDay = (days, day) => Object.assign(days, {[day]: getRandomBoolean()});

/**
* Генерация дней, в которые задача повторяется
* @return {Object} дни повторений
*/
export const generateRepeatingDays = () => DAYS.reduce(getDay, {});


/**
 * Получение даты выполнения
 * @return {Date} дата выполнения
 */
export const getDueDate = () => getRandomBoolean() ? getRandomDate() : null;

/**
 * Получение дней повторений задачи
 * @param {Date} dueDate
 * @return {Object}
 */
export const getRepeatingDays = (dueDate) => dueDate ? generateRepeatingDays() : DefaultRepeatingDays;
