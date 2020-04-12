import {DAYS} from "../../../../consts";

/**
 * Создание разметки блока повторения задачи
 * @param {Boolean} isRepeatingTask флаг, определеяющий является ли задача повторяющейся
 * @param {*} repeatingDays дни повторения
 * @return {string} разметка блока повторения задачи
 */
const createRepeatBlock = (isRepeatingTask, repeatingDays) => {
  const status = isRepeatingTask ? `yes` : `no`;

  return (`
    <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${status}</span>
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

/**
 * Создание шаблона формы выбора дня
 * @param {Array} days
 * @param {*} repeatingDays
 * @return {string}
 */
const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days.map((day, index) => {
    const isChecked = repeatingDays[day];
    return (`
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${index}"
        name="repeat"
        value="${day}"
        ${isChecked ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-${index}"
        >${day}</label
      >
    `);
  }).join(`\n`);
};

export {createRepeatBlock};
