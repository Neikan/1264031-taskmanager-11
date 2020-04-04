import {Position} from "./consts";

/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} template отрисовываемый шаблон
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
const render = (container, template, position = Position.BEFORE_END) =>
  void container.insertAdjacentHTML(position, template);

/**
 * Отрисовка нескольких элементов одного щаблона с позицией по умолчанию
 * @param {number} count количество итераций
 * @param {string} template шаблон для дублирования
 * @return {string}
 */
const renderElements = (count, template) => {
  let result = ``;
  for (let i = 0; i < count; i++) {
    result += template;
  }
  return result;
};

export {
  render,
  renderElements
};
