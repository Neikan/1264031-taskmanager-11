import {createSorting} from "./sortingBlock";
import {createBoardTasks} from "./tasksBlock";
import {createLoadMore} from "../../button-load-more/index-button-load-more";

/**
 * Создание разметки секции доски задач
 * @return {string} разметка секции
 */
export const createBoardSection = () => {
  return (`
    <section class="board container">
      ${createSorting()}
      ${createBoardTasks()}
      ${createLoadMore()}
    </section>
  `);
};
