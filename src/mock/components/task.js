import {COLORS, DAYS} from "../../components/consts.js";
import {DescriptionItems, DefaultRepeatingDays} from "../consts.js";
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
 * @param {Number} count количество элементов для генерации
 * @return {Array} массив сгенерированных задач
 */
export const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};
