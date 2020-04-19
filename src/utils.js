import {Position, CHECK_FORMAT_TIME} from "./consts";


/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} element отрисовываемый элемент
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const render = (container, element, position = Position.BEFORE_END) => {
  switch (position) {
    case Position.AFTER_BEGIN:
      container.prepend(element);
      break;
    case Position.AFTER_END:
      container.after(element);
      break;
    case Position.BEFORE_END:
      container.append(element);
      break;
  }
};


/**
 * Добавление ведущих нулей к часам / минутам: 2 -> 02
 * @param {string} value
 * @return {string}
 */
const castTimeFormat = (value) => {
  return value < CHECK_FORMAT_TIME ? `0${value}` : String(value);
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


/**
 * Создание DOM-элемента
 * @param {string} template шаблон-разметка для создания элемента
 * @return {string} разметка созданного элемента
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


/**
 * Замена DOM-элемента
 * @param {Object} container родительский элемент
 * @param {Object} newElement новый элемент
 * @param {Object} oldElement заменяемый элемент
 */
export const replace = (container, newElement, oldElement) => {
  container.replaceChild(newElement, oldElement);
};
