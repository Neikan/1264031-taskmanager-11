import {COLORS} from "../../consts.js";
import {DESCRIPTIONS} from "./tasks-consts.js";
import {
  getRandomBoolean,
  getRandomElement,
  getRandomDate,
  getRepeatingDays
} from "./tasks-utils.js";


let taskId = 1;

/**
 * Генерация задачи со случайными атрибутами
 * @return {Object} генерируемый объект задачи
 */
const generateTask = () => {
  const dueDate = getRandomBoolean() ? getRandomDate() : null;
  return {
    id: taskId++,
    description: getRandomElement(DESCRIPTIONS),
    dueDate,
    repeatingDays: getRepeatingDays(dueDate),
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
