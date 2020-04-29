import {CHECK_FORMAT_TIME} from "../consts";


/**
 * Добавление ведущих нулей к часам / минутам: 2 -> 02
 * @param {string} value
 * @return {string}
 */
const castTimeFormat = (value) => {
  return value < CHECK_FORMAT_TIME ? `0${value}` : String(value);
};


/**
 * Приведение времени к формату "HH:MM"
 * @param {Date} date форматируемая дата
 * @return {string} время в формате HH:MM
 */
export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};


/**
 * Проверка дней на наличие дней повторения
 * @param {Object} days
 * @return {Boolean} результат
 */
export const checkIsRepeating = (days) => Object.values(days).some(Boolean);


/**
 * Получение текущего количества задач на доске
 * @return {Number} количество задач
 */
export const getCurrentCountTasks = () => document.querySelectorAll(`.card`).length;

/**
 * Правила фильтрации
 */
export const filterRules = {
  'all': (tasksNotArchive) => tasksNotArchive,

  'overdue': (tasksNotArchive) =>
    tasksNotArchive.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()),

  'today': (tasksNotArchive) =>
    tasksNotArchive.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()),

  'favorites': (tasksNotArchive) =>
    tasksNotArchive.filter((task) => task.isFavorite),

  'repeating': (tasksNotArchive) =>
    tasksNotArchive.filter((task) => checkIsRepeating(task.repeatingDays)),

  'archive': (tasksNotDelete) => tasksNotDelete.filter((task) => task.isArchive)
};

/**
 * Получение задач для фильтрации
 * @param {Array} allTasks данные задач
 * @return {Object} задачи
 */
export const getTasksForFilters = (allTasks) => {
  const tasksNotDelete = (allTasks.length) ? allTasks.filter((task) => !task.isDeleted) : [];
  const tasksNotArchive = (tasksNotDelete.length) ? tasksNotDelete.filter((task) => !task.isArchive) : [];

  return {tasksNotDelete, tasksNotArchive};
};
