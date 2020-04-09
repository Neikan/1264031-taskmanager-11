import {createTask} from "../../task";

/**
 * Создание разметки нескольких задач
 * @param {Array} tasks массив задач
 * @return {string} разметка для нескольких задач
 */
export const createTasks = (tasks) => {
  let result = ``;
  tasks.forEach((it) => {
    result += createTask(it, true);
  });
  return result;
};
