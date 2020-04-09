import {createDateBlock} from "../../edit-form/dateBlock";
import {createRepeatBlock} from "../../edit-form/repeatBlock";
import {createColorsBlock} from "../../edit-form/colorsBlock";

/**
 * Создание разметки блока с описанием задачи для формы просмотра
 * @param {string} task описание задачи
 * @param {string} date дата
 * @param {string} time время
 * @param {Boolean} isRepeatingTask
 * @param {Boolean} isDateShowing
 * @return {string} разметка блока с описанием задачи
 */
export const getEditSettings = (task, date, time, isRepeatingTask, isDateShowing) => {
  const {color, repeatingDays} = task;

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
};
