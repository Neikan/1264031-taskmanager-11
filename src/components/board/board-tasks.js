import {createTask, createTasks} from "./task";
import {Form, CountTask} from "../../consts";

/**
 * Создание разметки блока задач
 * @param {Array} tasks задачи
 * @return {string} разметка блока
 */
const createBoardTasks = (tasks) => {
  return (`
    <div class="board__tasks">
      ${createTask(tasks[0], Form.EDIT)}
      ${createTasks(tasks.slice(1, CountTask.START))}
    </div>
  `);
};

export {createBoardTasks};
