import {CountTask} from "../../consts";
import {createTask, createTasks} from "./task";

/**
 * Создание разметки блока задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoardTasks = (tasks) => {
  return (`
    <div class="board__tasks">
      ${createTask(tasks[0], false)}
      ${createTasks(tasks.slice(1, CountTask.START))}
    </div>
  `);
};

export {createBoardTasks};
