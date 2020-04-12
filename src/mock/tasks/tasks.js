import {COLORS} from "../../consts.js";
import {DESCRIPTIONS, DefaultRepeatingDays} from "./tasks-consts.js";
import {
  getRandomBoolean,
  getRandomElement,
  getRandomDate,
  generateRepeatingDays
} from "./tasks-utils.js";

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
