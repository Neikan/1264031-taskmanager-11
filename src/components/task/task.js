import {getViewForm} from "./components/task-view";
import {getEditForm} from "./components/task-edit";
import {CardClass, Form, ButtonTask, PART_BTN_CLASS} from "../../consts";
import AbstractComponent from "../abstract/abstract-component";


/**
 * Создание разметки блока формы карточки задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока
 */
const createTask = (task, isView) => {
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
 * Создание класса задачи
 */
export default class Task extends AbstractComponent {
  constructor(task, isView = Form.VIEW) {
    super();

    this._task = task;
    this._isView = isView;
  }

  getTemplate() {
    return createTask(this._task, this._isView);
  }

  // View-form
  setEditBtnClickHandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.EDIT}`)
      .addEventListener(`click`, handler);
  }

  setArchiveBtnClickhandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.ARCHIVE}`)
      .addEventListener(`click`, handler);
  }

  setFavoriteBtnClickhandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.FAVORITE}`)
      .addEventListener(`click`, handler);
  }

  // Edit-form
  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.${ButtonTask.DELETE}`)
      .addEventListener(`click`, handler);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`${ButtonTask.FORM}`)
      .addEventListener(`submit`, handler);
  }
}
