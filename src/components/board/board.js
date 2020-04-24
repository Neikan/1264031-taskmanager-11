import AbstractComponent from "../abstract/abstract-component.js";


/**
 * Создание разметки блока доски задач
 * @return {string} разметка блока
 */
const createBoard = () => {
  return `<section class="board container"></section>`;
};


/**
 * Создание класса доски задач
 */
export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoard(this._tasks);
  }
}
