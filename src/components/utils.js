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
 * @param {string} container контейнер, в который отрисосывается шаблон
 * @param {string} template отрисовываемый шаблон
 */
const renderElements = (count, container, template) => {
  for (let i = 0; i < count; i++) {
    render(container, template);
  }
};

export {
  render,
  renderElements
};
