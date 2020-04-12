import {Position} from "./consts";

/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} template отрисовываемый шаблон
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const render = (container, template, position = Position.BEFORE_END) =>
  void container.insertAdjacentHTML(position, template);

/**
 * Добавление ведущих нулей к часам / минутам: 2 -> 02
 * @param {string} value
 * @return {string}
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/**
 * Приведение времени к формату "HH:MM"
 * @param {Date} date форматируемая дата
 * @return {string} время в формате HH:MM
 */
export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};
