import AbstractComponent from "../abstract/abstract-component.js";
import {createSorting} from "./components/sorting";
import {createBoardTasks} from "./components/board-tasks";
import {createLoadMore} from "./components/load-more-button";


/**
 * Создание разметки блока доски задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoard = (tasks) => {
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
export default class Board extends AbstractComponent {
  constructor(tasks) {
    super();

    this._tasks = tasks;
  }

  getTemplate() {
    return createBoard(this._tasks);
  }
}
