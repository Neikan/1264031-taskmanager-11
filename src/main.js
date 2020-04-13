import {CountTask} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {createMenu} from "./components/menu";
import {createFilters} from "./components/filters";
import {createBoard} from "./components/board";
import {createTasks} from "./components/board/task";
import {render} from "./utils";

const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};

const tasks = generateTasks(CountTask.ALL);

let showingTasksCount = CountTask.START;

const loadMoreClickHandler = () => {
  const taskListElement = document.querySelector(`.board__tasks`);
  const prevTasksCount = showingTasksCount;
  showingTasksCount += CountTask.BY_BUTTON;

  render(taskListElement, createTasks(tasks.slice(prevTasksCount, showingTasksCount)));

  if (showingTasksCount >= tasks.length) {
    document.querySelector(`.load-more`).remove();
  }
};

/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  render(Nodes.HEADER, createMenu());
  render(Nodes.MAIN, createFilters());
  render(Nodes.MAIN, createBoard(tasks));

  document.querySelector(`.load-more`).addEventListener(`click`, loadMoreClickHandler);
};

init();
