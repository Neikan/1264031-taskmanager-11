import {getViewForm} from "./board-tasks/task-view";
import {getEditForm} from "./board-tasks/task-edit";

/**
 * Создание шаблона отображения существующей карточки задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} форма просмотра задачи
 */
const createTask = (task, isView) => {
  const {dueDate, repeatingDays} = task;

  const Parameters = {
    isExpired: dueDate instanceof Date && dueDate < Date.now(),
    isRepeatingTask: Object.values(repeatingDays).some(Boolean)
  };

  const ClassesMarkup = {
    repeatClass: Parameters.isRepeatingTask ? `card--repeat` : ``,
    deadlineClass: Parameters.isExpired ? `card--deadline` : ``
  };

  return isView ? getViewForm(task, isView, ClassesMarkup) : getEditForm(task, isView, ClassesMarkup, Parameters);
};

/**
 * Создание разметки нескольких задач
 * @param {Array} tasks задачи
 * @return {string} разметка нескольких задач
 */
const createTasks = (tasks) => {
  let result = ``;
  tasks.forEach((it) => {
    result += createTask(it, true);
  });
  return result;
};

export {createTask, createTasks};
