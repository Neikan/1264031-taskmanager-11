import {COUNT_TASKS} from "./components/consts";

import {createMenu} from "./components/menu";
import {createFilter} from "./components/filters";
import {createBoard} from "./components/board";

import {render} from "./components/utils";

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
};

init();
