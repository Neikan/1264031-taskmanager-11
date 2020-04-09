import {Count} from "./consts";
import {render} from "./utils";
import {tasks} from "./board/components/tasksBlock";
import {createTask} from "./tasks/index-view";

let showingTasksCount = Count.TASKS_ON_START;

export const addListeners = () => {
  document.querySelector(`.load-more`).addEventListener(`click`, loadMoreClickHandler);
};

const loadMoreClickHandler = () => {
  const taskListElement = document.querySelector(`.board__tasks`);
  const prevTasksCount = Count.TASKS_ON_START;
  showingTasksCount += Count.TASKS_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTask(task, true)));

  if (showingTasksCount >= tasks.length) {
    document.querySelector(`.load-more`).remove();
  }
};
