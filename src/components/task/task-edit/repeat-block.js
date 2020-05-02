import {DAYS, Decision, Checked} from "../../../consts";


/**
 * Создание разметки блока повторений задачи
 * @param {Boolean} isRepeatingTask флаг, определеяющий является ли задача повторяющейся
 * @param {Object} activeRepeatingDays дни повторений
 * @return {string} разметка блока
 */
const createRepeatBlock = ({isRepeatingTask, activeRepeatingDays}) =>
  collectRepeatBlock(getRepeatParams(isRepeatingTask, activeRepeatingDays));


/**
 * Получение параметров повторений
 * @param {Boolean} isRepeating флаг, определеяющий является ли задача повторяющейся
 * @param {Object} activeRepeatingDays дни повторений
 * @return {Object} параметры повторений
 */
const getRepeatParams = (isRepeating, activeRepeatingDays) => {
  return {
    status: isRepeating ? Decision.YES : Decision.NO,
    showing: isRepeating ? createRepeatShowingBlock(activeRepeatingDays) : ``
  };
};


/**
 * Сбор разметки блока повторений в зависимости от параметров
 * @param {Object} {параметры повторений}
 * @return {string} разметка блока
 */
const collectRepeatBlock = ({status, showing}) => {
  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${status}</span>
    </button>
    ${showing}`
  );
};


/**
 * Создание разметки блока показа дней
 * @param {Object} activeRepeatingDays дни повторений
 * @return {string} разметка блока
 */
const createRepeatShowingBlock = (activeRepeatingDays) => {
  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${createRepeatingDays(DAYS, activeRepeatingDays)}
      </div>
    </fieldset>`
  );
};


/**
 * Создание разметки блока дней
 * @param {Array} days дни
 * @param {Object} activeRepeatingDays дни повторений
 * @return {string} разметка блока
 */
const createRepeatingDays = (days, activeRepeatingDays) =>
  days.map((day, index) => createRepeatingDay(day, index, activeRepeatingDays)).join(`\n`);


/**
 * Создание разметки блока дня
 * @param {string} day день
 * @param {Number} index номер дня в массиве дней
 * @param {Object} activeRepeatingDays дни повторений
 * @return {string} разметка блока
 */
const createRepeatingDay = (day, index, activeRepeatingDays) => {
  const checked = activeRepeatingDays[day] ? Checked.INPUT : ``;
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-${index}"
      name="repeat"
      value="${day}"
      ${checked}
    />
    <label class="card__repeat-day" for="repeat-${day}-${index}">${day}</label>`
  );
};


export {createRepeatBlock};
