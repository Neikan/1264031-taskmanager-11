import {createSorting} from "./board/components/sorting";
import {createBoardTasks} from "./board/components/board-tasks";
import {createLoadMore} from "./board/components/load-more-button";
import {createElement} from "../utils";

/**
 * Создание разметки блока доски задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoard = (tasks) => {
  const board = tasks.length ? getBoardWithTasks() : getBoardNoTasks();

  return `<section class="board container">${board}</section>`;
};

/**
 * Получение разметки блока доски при наличии задач
 * @return {string} разметка блока
 */
const getBoardWithTasks = () => `${createSorting()}${createBoardTasks()}${createLoadMore()}`;

/**
 * Получение разметки блока доски при отсутствии задач
 * @return {string} разметка блока
 */
const getBoardNoTasks = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
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
