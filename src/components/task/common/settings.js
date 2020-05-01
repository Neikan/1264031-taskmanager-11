import {MONTH_NAMES} from "../../../consts";
import {formatTime} from "../../../utils/common";
import {getViewSettings} from "./settings/settings-view";
import {getEditSettings} from "./settings/settings-edit";


/**
 * Создание разметки блока параметров задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} options параметры формы редактирования задачи
 * @return {string} разметка блока
 */
const createSettingsBlock = (task, isView, options) => {
  const {dueDate} = task;
  const isShowning = isView ? !!dueDate : options.isDateShowing;

  const date = (isShowning && dueDate) ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = (isShowning && dueDate) ? formatTime(dueDate) : ``;

  return isView ? getViewSettings(date, time) : getEditSettings(date, time, isShowning, options);
};

export {createSettingsBlock};
