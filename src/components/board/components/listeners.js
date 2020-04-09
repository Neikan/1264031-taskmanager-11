import {Count} from "../../../components/consts";
import {render} from "../../../components/utils";
import {tasks} from "../index-board";
import {createTask} from "../../task/task";

let showingTasksCount = Count.TASKS_ON_START;

export const loadMoreClickHandler = () => {
  const taskListElement = document.querySelector(`.board__tasks`);
  const prevTasksCount = Count.TASKS_ON_START;
  showingTasksCount += Count.TASKS_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTask(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    document.querySelector(`.load-more`).remove();
  }
};
