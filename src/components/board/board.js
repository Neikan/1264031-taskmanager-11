import {createSorting} from "./components/sorting";
import {createBoardTasks} from "./components/board-tasks";
import {createLoadMore} from "./components/load-more-button";
import {createElement} from "../../utils";
// import {NO_TASKS} from "../../consts";


/**
 * Создание разметки блока доски задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoard = (tasks) => {
  // const isAllTasksInArchive = tasks.every((task) => task.isArchive);
  const board = tasks.length ? getBoardWithTasks(tasks) : getBoardNoTasks();

  return `<section class="board container">${board}</section>`;
};


/**
 * Получение разметки блока доски при наличии задач
 * @param {Array} tasks
 * @return {string} разметка блока
 */
const getBoardWithTasks = (tasks) => `${createSorting()}${createBoardTasks()}${createLoadMore(tasks)}`;

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
