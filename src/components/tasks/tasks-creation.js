import {createTask} from "./task-view-form";

/**
 * Создание нескольких задач по одному шаблону
 * @param {Array} tasks массив задач
 * @return {string} результирущая строка
 */
export const createTasks = (tasks) => {
  let result = ``;
  tasks.forEach((it) => {
    result += createTask(it);
  });
  return result;
};
