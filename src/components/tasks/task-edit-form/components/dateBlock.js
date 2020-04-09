/**
 * Создание разметки блока даты и времени
 * @param {Boolean} isDateShowing флаг, определяющий отображение даты и времени
 * @param {string} date дата
 * @param {string} time время
 * @return {string} разметка блока
 */
export const createDateBlock = (isDateShowing, date, time) => {
  return (`
    <button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
    </button>

    ${isDateShowing ?
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"
          />
        </label>
      </fieldset>`
      : ``
    }
  `);
};
