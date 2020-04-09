import {createMenu} from "./components/menu/index-menu";
import {createFilters} from "./components/filters/index-filters";
import {createBoard} from "./components/board/index-board";
import {render} from "./components/utils";

import {loadMoreClickHandler} from "./components/board/components/listeners";

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

  document.querySelector(`.load-more`).addEventListener(`click`, loadMoreClickHandler);
};

init();
