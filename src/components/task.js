import {getViewForm} from "./task/task-view";
import {getEditForm} from "./task/task-edit";
import {CardClass, Form} from "../consts";
import {createElement} from "../utils";
/**
 * Создание разметки блока формы карточки задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока
 */
export const createTask = (task, isView) => {
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

export {createTasks};


/**
 * Создание класса задачи
 */
export default class Task {
  constructor(task, isView = Form.VIEW) {
    this._task = task;
    this._isView = isView;
    this._element = null;
  }

  getTemplate() {
    return createTask(this._task, this._isView);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
