import {CardClass} from "../../consts";
import {getViewForm} from "./task-creation-view";
import {getEditForm} from "./task-creation-edit";
import {checkIsRepeating} from "../../utils/common";


/**
 * Создание разметки блока формы карточки задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} options параметры формы редактирования задачи
 * @return {string} разметка блока
 */
const createTask = (task, isView, options = {}) => {
  const {dueDate} = task;
  const days = isView ? task.repeatingDays : options.activeRepeatingDays;

  const additionalInfo = getAdditionalInfo(dueDate, days);
  const additionalMarkup = getAdditionalMarkup(additionalInfo);

  return isView ?
    getViewForm(task, additionalMarkup, isView) :
    getEditForm(task, additionalMarkup, isView, options);
};


/**
 * Получение дополнительных вычисляемых свойств задачи
 * @param {Object} dueDate
 * @param {Object} repeatingDays
 * @param {Object} isView
 * @param {Object} isDateShowing
 * @param {Object} activeRepeatingDays
 * @param {Object} {параметры задачи}
 * @return {Object} дополнительные параметры
 */
const getAdditionalInfo = (dueDate, repeatingDays) => {
  return {
    isExpired: dueDate instanceof Date && dueDate < Date.now(),
    isRepeating: checkIsRepeating(repeatingDays),
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


export {createTask};
