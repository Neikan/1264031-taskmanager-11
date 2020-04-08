import {createMenu} from "./components/menu/index";
import {createFilter} from "./components/filters/index";
import {createBoard} from "./components/board/index";
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
