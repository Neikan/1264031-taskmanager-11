import {createSorting} from "./board/sorting";
import {createBoardTasks} from "./board/board-tasks";
import {createLoadMore} from "./board/index-button-load-more";

/**
 * Создание разметки блока доски задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoard = (tasks) => {
  return (`
    <section class="board container">
      ${createSorting()}
      ${createBoardTasks(tasks)}
      ${createLoadMore()}
    </section>
  `);
};

export {createBoard};
