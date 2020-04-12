import {COLORS, DAYS} from "../../consts.js";
import {DESCRIPTIONS, DefaultRepeatingDays} from "./tasks-consts.js";
import {getRandomBoolean, getRandomElement, getRandomDate} from "./tasks-utils.js";

/**
  * Получение дня повторения задачи
  * @param {*} days
  * @param {*} day
  * @return {Object} день повторения
  */
const getDay = (days, day) => Object.assign(days, {[day]: getRandomBoolean()});

/**
 * Генерация дней, в которые задача повторяется
 * @return {Object} дни повторения
 */
const generateRepeatingDays = () => DAYS.reduce(getDay, {});

/**
 * Генерация задачи со случайными атрибутами
 * @return {Object} генерируемый объект задачи
 */
const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomElement(DESCRIPTIONS),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomElement(COLORS),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

/**
 * Генерация массива задач
 * @param {Number} count количество элементов для генерации
 * @return {Array} массив сгенерированных задач
 */
const generateTasks = (count) => new Array(count).fill({}).map(generateTask);

export {generateTask, generateTasks};
