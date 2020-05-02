import {CountTask, Position, Filter} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {generateFilters} from "./mock/filters/filters";
import {render} from "./utils/change-component";
import {Menu} from "./components/menu.js";
import {Filters} from "./components/filters.js";
import {Board} from "./components/board.js";
import {BoardController} from "./controllers/board.js";
import {getFilteredTasks, setCheckFilter, addListenersToFilters} from "./controllers/filters";


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
  const filtersComponent = new Filters(filters);
  const boardComponent = new Board(getFilteredTasks(tasks));
  const boardController = new BoardController(boardComponent);

  render[Position.BEFORE_END](Nodes.HEADER, new Menu());
  render[Position.BEFORE_END](Nodes.MAIN, filtersComponent);
  render[Position.BEFORE_END](Nodes.MAIN, boardComponent);

  setCheckFilter(Filter.DEFAULT);
  boardController.render(tasks, Filter.DEFAULT);

  addListenersToFilters(tasks, filtersComponent, boardController);
};


init();
