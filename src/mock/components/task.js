import {Count, COLORS, DAYS} from "../../components/consts.js";
import {DescriptionItems, DefaultRepeatingDays} from "../consts.js";
import {createTask} from "../../components/task/task.js";
import {getRandomBoolean, getRandomArrayItem, getRandomDate} from "../utils.js";

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
export const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

/**
 * Генерация массива задач
 * @param {Number} count
 * @return {Array} массив сгенерированных задач
 */
export const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

/**
 * Создание нескольких задач по одному шаблону
 * @param {string} template шаблон для дублирования
 * @return {string} результирущая строка
 */
export const createTasks = () => {
  let result = ``;
  for (let i = 0; i < Count.TASKS_ON_START; i++) {
    result += createTask(generateTask());
  }
  return result;
};
