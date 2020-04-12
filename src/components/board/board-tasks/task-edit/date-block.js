import {Decision} from "../../../../consts";

/**
 * Создание разметки блока даты и времени
 * @param {Boolean} isDateShowing флаг, определяющий отображение даты и времени
 * @param {string} date дата
 * @param {string} time время
 * @return {string} разметка блока
 */
const createDateBlock = (isDateShowing, date, time) =>
  collectDateBlock(getDateParams(isDateShowing, date, time));

/**
 * Получение параметров даты и времени
 * @param {Boolean} isDateShowing флаг, определеяющий является ли задача повторяющейся
 * @param {string} date дата
 * @param {string} time время
 * @return {Object} параметры повторений
 */
const getDateParams = (isDateShowing, date, time) => {
  return {
    status: isDateShowing ? Decision.YES : Decision.NO,
    showing: isDateShowing ? createDateShowingBlock(date, time) : ``
  };
};

/**
 * Сбор разметки блока даты и времени в зависимости от параметров
 * @param {string} {параметры даты и времени}
 * @return {string} разметка блока
 */
const collectDateBlock = ({status, showing}) => {
  return (`
    <button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${status}</span>
    </button>
    ${showing}
  `);
};

/**
 * Создание разметки блока показа даты
 * @param {string} date
 * @param {string} time
 * @return {string} разметка блока
 */
const createDateShowingBlock = (date, time) => {
  return (`
    <fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${date} ${time}"
        />
      </label>
    </fieldset>
  `);
};

export {createDateBlock};
