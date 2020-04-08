import {COUNT_TASKS, Colors} from "../components/consts.js";
import {DescriptionItems, DefaultRepeatingDays} from "./consts.js";
import {createTask} from "../components/task/task.js";
import {getRandomArrayItem, getRandomDate} from "./utils.js";

/**
 * Генерация дня недели для повторяющихся задач
 * @return {Object}
 */
const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    "mo": Math.random() > 0.5,
  });
};

/**
 * Генерация задачи со случайными атрибутами
 * @return {Object} генерируемый объект задачи
 */
export const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(Colors),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

/**
 * Создание нескольких задач по одному шаблону
 * @param {string} template шаблон для дублирования
 * @return {string} результирущая строка
 */
export const createTasks = () => {
  let result = ``;
  for (let i = 0; i < COUNT_TASKS; i++) {
    result += createTask(generateTask());
  }
  return result;
};


// const generateTasks = (count) => {
//   return new Array(count)
//     .fill(``)
//     .map(generateTask);
// };
