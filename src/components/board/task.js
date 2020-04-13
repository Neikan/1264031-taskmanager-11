import {getViewForm} from "./board-tasks/task-view";
import {getEditForm} from "./board-tasks/task-edit";
import {Form, CardClass} from "../../consts";

/**
 * Создание разметки блока формы карточки задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока
 */
const createTask = (task, isView = Form.VIEW) => {
  const {dueDate, repeatingDays} = task;
  const additionalInfo = getAdditionalInfo({dueDate, repeatingDays});
  const additionalMarkup = getAdditionalMarkup(additionalInfo);

  return isView ?
    getViewForm(task, additionalMarkup, isView) :
    getEditForm(task, additionalMarkup, isView, additionalInfo);
};

/**
 * Получение дополнительных вычисляемых свойств задачи
 * @param {Object} {параметры задачи}
 * @return {Object} дополнительные параметры
 */
const getAdditionalInfo = ({dueDate, repeatingDays}) => {
  return {
    isExpired: dueDate instanceof Date && dueDate < Date.now(),
    isRepeating: Object.values(repeatingDays).some(Boolean)
  };
};

/**
 * Получение дополнительных классов разметки для карточки задачи
 * @param {Object} {дополнительные параметры}
 * @return {Object} дополнительные классы для разметки
 */
const getAdditionalMarkup = ({isExpired, isRepeating}) => {
  return {
    repeat: isRepeating ? CardClass.repeat : ``,
    deadline: isExpired ? CardClass.deadline : ``
  };
};

/**
 * Создание разметки блока нескольких задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createTasks = (tasks) => tasks.reduce((cards, task) => cards + createTask(task), ``);

export {createTask, createTasks};
