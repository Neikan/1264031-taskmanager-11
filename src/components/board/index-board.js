import {Count} from "../../components/consts";
import {createLoadMore} from "./components/index-button-load-more";
import {createTaskEdit} from "../task/task-form";
import {generateTasks, createTasks} from "../../mock/components/task";

export const tasks = generateTasks(Count.TASKS);

/**
 * Создание шаблона доски задач
 * @return {string} доска для отображения задач
 */
export const createBoard = () => {
  return (`
    <section class="board container">
      <div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
      </div>

      <div class="board__tasks">
        ${createTaskEdit(tasks[0])}
        ${createTasks(tasks.slice(1, Count.TASKS_ON_START))}
      </div>
      ${createLoadMore()}
    </section>
  `);
};
