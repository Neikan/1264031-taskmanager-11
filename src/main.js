import {CountTask, DEFAULT_FILTER} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {generateFilters} from "./mock/filters/filters";
import {render} from "./utils/change-component";
import {getFilteredTasks, setCheckFilter, addListenersToFilters} from "./components/filters/filters-helpers";
import MenuComponent from "./components/menu/menu.js";
import FiltersComponent from "./components/filters/filters.js";
import BoardComponent from "./components/board/board.js";
import BoardController from "./controllers/board.js";


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
  const boardComponent = new BoardComponent(getFilteredTasks(tasks));
  const boardController = new BoardController(boardComponent);

  render(Nodes.HEADER, new MenuComponent());
  render(Nodes.MAIN, filtersComponent);
  render(Nodes.MAIN, boardComponent);

  setCheckFilter(DEFAULT_FILTER);
  boardController.render(tasks, DEFAULT_FILTER);

  addListenersToFilters(tasks, filtersComponent, boardController);
};


init();
