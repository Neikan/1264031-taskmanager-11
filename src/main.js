import {COUNT_TASKS} from "./components/consts";

import {createMenu} from "./components/menu";
import {createFilter} from "./components/filters";
import {createBoard} from "./components/board";
import {createTask} from "./components/task";
import {createTaskEdit} from "./components/task-form";
import {createLoadMore} from "./components/button-load-more";

import {render, renderElements} from "./components/utils";

const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};

/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  render(Nodes.HEADER, createMenu());
  render(Nodes.MAIN, createFilter());
  render(Nodes.MAIN, createBoard());

  const taskListElement = Nodes.MAIN.querySelector(`.board__tasks`);
  render(taskListElement, createTaskEdit());
  renderElements(COUNT_TASKS, taskListElement, createTask());

  const boardElement = Nodes.MAIN.querySelector(`.board`);
  render(boardElement, createLoadMore());
};

init();
