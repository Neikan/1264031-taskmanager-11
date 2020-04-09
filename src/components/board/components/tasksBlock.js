import {Count} from "../../consts";
import {createTaskEdit} from "../../tasks/task-edit-form/index-edit";
import {createTasks} from "../../tasks/common/tasks-creation";
import {generateTasks} from "../../../mock/components/task";

export const tasks = generateTasks(Count.TASKS);

/**
 * Создание разметки списка задач
 * @return {string} разметка списка задач
 */
export const createBoardTasks = () => {
  return (`
    <div class="board__tasks">
      ${createTaskEdit(tasks[0])}
      ${createTasks(tasks.slice(1, Count.TASKS_ON_START))}
    </div>
  `);
};
