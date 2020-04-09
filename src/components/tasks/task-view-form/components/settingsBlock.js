import {MONTH_NAMES} from "../../../consts";
import {formatTime} from "../../../utils";

/**
 * Создание разметки блока параметров задачи
 * @param {Object} task задача
 * @param {Boolean} isRepeatingTask флаг, определеяющий является ли задача повторяющейся
 * @return {string} разметка блока параметров задачи
 */
export const createSettingsBlock = (task) => {
  const {dueDate} = task;

  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

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
};
