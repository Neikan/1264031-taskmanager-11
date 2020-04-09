import {Count} from "../../consts";
import {createTask} from "../../tasks/index-view";
import {createTasks} from "../../tasks/components/common/tasks-creation";
import {generateTasks} from "../../../mock/components/task";

export const tasks = generateTasks(Count.TASKS);

/**
 * Создание разметки списка задач
 * @return {string} разметка списка задач
 */
export const createBoardTasks = () => {
  return (`
    <div class="board__tasks">
      ${createTask(tasks[0], false)}
      ${createTasks(tasks.slice(1, Count.TASKS_ON_START))}
    </div>
  `);
};
