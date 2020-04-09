import {MONTH_NAMES} from "../../../consts";
import {formatTime} from "../../../utils";
import {getViewSettings} from "./components/settingsView";
import {getEditSettings} from "./components/settingsEdit";

/**
 * Создание разметки блока параметров задачи
 * @param {Object} task задача
 * @param {Boolean} isView
 * @param {Boolean} isRepeatingTask флаг, определеяющий является ли задача повторяющейся
 * @return {string} разметка блока параметров задачи
 */
export const createSettingsBlock = (task, isView, isRepeatingTask) => {
  const {dueDate} = task;

  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  return isView ? getViewSettings(date, time) : getEditSettings(task, date, time, isRepeatingTask, isDateShowing);
};
