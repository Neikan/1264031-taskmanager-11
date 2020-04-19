import {CountTask, DEFAULT_FILTER} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {generateFilters} from "./mock/filters/filters";
import {render} from "./utils";
import {renderBoard} from "./helpers/board";
import {addListenersToFilters, getFilteringTasks, setCheckFilter} from "./helpers/filters";
import MenuComponent from "./components/menu/menu.js";
import FiltersComponent from "./components/filters/filters.js";
import BoardComponent from "./components/board/board.js";


const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const tasks = generateTasks(CountTask.ALL);
  const filters = generateFilters(tasks);
  const filtersComponent = new FiltersComponent(filters);
  const boardComponent = new BoardComponent(getFilteringTasks(tasks));

  render(Nodes.HEADER, new MenuComponent().getElement());
  render(Nodes.MAIN, filtersComponent.getElement());
  render(Nodes.MAIN, boardComponent.getElement());

  setCheckFilter(DEFAULT_FILTER);
  renderBoard(boardComponent, tasks, DEFAULT_FILTER, filtersComponent);
  addListenersToFilters(filtersComponent, tasks, boardComponent);
};


init();
