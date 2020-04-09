import {createMenu} from "./components/menu/menu";
import {createFilters} from "./components/filters/filters";
import {createBoard} from "./components/board/board";
import {render} from "./components/utils";
import {addListeners} from "./components/listeners";

const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};

/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  render(Nodes.HEADER, createMenu());
  render(Nodes.MAIN, createFilters());
  render(Nodes.MAIN, createBoard());

  addListeners();
};

init();
