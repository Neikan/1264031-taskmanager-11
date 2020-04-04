import {COUNT_TASKS} from "./consts";
import {createTask} from "./task";

/**
 * Создание нескольких задач по одному шаблону
 * @param {string} template шаблон для дублирования
 * @return {string} результирущая строка
 */
export const createTasks = () => {
  let result = ``;
  for (let i = 0; i < COUNT_TASKS; i++) {
    result += createTask();
  }
  return result;
};
