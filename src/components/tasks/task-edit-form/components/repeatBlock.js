import {DAYS} from "../../../consts";
import {createRepeatingDaysMarkup} from "./repeatingDaysBlock";

/**
 * Создание разметки блока повторения задачи
 * @param {*} isRepeatingTask флаг, определеяющий является ли задача повторяющейся
 * @param {*} repeatingDays дни повторения
 * @return {string} разметка блока повторения задачи
 */
export const createRepeatBlock = (isRepeatingTask, repeatingDays) => {
  return (`
    <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
    </button>

    ${isRepeatingTask ?
      `<fieldset class="card__repeat-days">
          <div class="card__repeat-days-inner">
            ${createRepeatingDaysMarkup(DAYS, repeatingDays)}
          </div>
        </fieldset>`
      : ``
    }
  `);
};
