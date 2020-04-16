import {createSorting} from "./board/sorting";
import {createBoardTasks} from "./board/board-tasks";
import {createLoadMore} from "./board/index-button-load-more";
import {createElement} from "../utils";

/**
 * Создание разметки блока доски задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
export const createBoard = (tasks) => {
  return (
    `<section class="board container">
      ${createSorting()}
      ${createBoardTasks(tasks)}
      ${createLoadMore()}
    </section>`
  );
};

/**
 * Создание класса доски задач
 */
export default class Board {
  constructor(tasks) {
    this._tasks = tasks;
    this._element = null;
  }

  getTemplate() {
    return createBoard(this._tasks);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
