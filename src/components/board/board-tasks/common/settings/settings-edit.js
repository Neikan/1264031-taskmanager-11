import {createDateBlock} from "../../task-edit/date-block";
import {createRepeatBlock} from "../../task-edit/repeat-block";
import {createColorsBlock} from "../../task-edit/colors-block";

/**
 * Создание разметки блока с описанием задачи для формы просмотра
 * @param {string} task описание задачи
 * @param {string} date дата
 * @param {string} time время
 * @param {Boolean} isRepeating
 * @param {Boolean} isDateShowing
 * @return {string} разметка блока с описанием задачи
 */
const getEditSettings = (task, date, time, isRepeating, isDateShowing) => {
  const {color, repeatingDays} = task;

  return (`
    <div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          ${createDateBlock(isDateShowing, date, time)}
          ${createRepeatBlock(isRepeating, repeatingDays)}
        </div>
      </div>
      ${createColorsBlock(color)}
    </div>
  `);
};

export {getEditSettings};
