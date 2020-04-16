import {COLORS} from "../../consts.js";
import {DESCRIPTIONS} from "./tasks-consts.js";
import {
  getRandomBoolean,
  getRandomElement,
  getRandomDate,
  getRepeatingDays
} from "./tasks-utils.js";

/**
 * Генерация задачи со случайными атрибутами
 * @return {Object} генерируемый объект задачи
 */
const generateTask = () => {
  const dueDate = getRandomBoolean() ? getRandomDate() : null;

  return {
    description: getRandomElement(DESCRIPTIONS),
    dueDate,
    repeatingDays: getRepeatingDays(dueDate),
    color: getRandomElement(COLORS),
    isArchive: getRandomBoolean(),
    // isArchive: true,
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
