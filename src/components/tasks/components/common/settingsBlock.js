import {createDateBlock} from "../edit-form/dateBlock";
import {createRepeatBlock} from "../edit-form/repeatBlock";
import {createColorsBlock} from "../edit-form/colorsBlock";
import {formatTime} from "../../../utils";
import {MONTH_NAMES} from "../../../consts";

/**
 * Создание разметки блока параметров задачи
 * @param {Boolean} isView
 * @param {Object} task задача
 * @param {Boolean} isRepeatingTask флаг, определеяющий является ли задача повторяющейся
 * @return {string} разметка блока параметров задачи
 */
export const createSettingsBlock = (isView, task, isRepeatingTask) => {
  const {dueDate, color, repeatingDays} = task;

  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  if (isView) {
    return (`
      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${date}</span>
                <span class="card__time">${time}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  else {
    return (`
      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            ${createDateBlock(isDateShowing, date, time)}
            ${createRepeatBlock(isRepeatingTask, repeatingDays)}
          </div>
        </div>
        ${createColorsBlock(color)}
      </div>
    `);
  }
};
