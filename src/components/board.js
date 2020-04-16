import {createSorting} from "./board/sorting";
import {createBoardTasks} from "./board/board-tasks";
import {createLoadMore} from "./board/index-button-load-more";
import {createElement} from "../utils";

/**
 * Создание разметки блока доски задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoardO = () => {
  return (
    `<section class="board container">
      ${createSorting()}
      ${createBoardTasks()}
      ${createLoadMore()}
    </section>`
  );
};

const createBoard = (tasks) => tasks.length ? getBoardWithTasks() : getBoardNoTasks();

const getBoardWithTasks = () => {
  return (
    `<section class="board container">
      ${createSorting()}
      ${createBoardTasks()}
      ${createLoadMore()}
    </section>`
  );
};

const getBoardNoTasks = () => {
  return (
    `<section class="board container">
      <p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
      </p>
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
