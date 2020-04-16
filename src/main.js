import {CountTask} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {generateFilters} from "./mock/filters/filters";
import {render} from "./utils";
import {renderBoard} from "./components/board/helpers/helpers";
import MenuComponent from "./components/menu/menu.js";
import FiltersComponent from "./components/filters/filters.js";
import BoardComponent from "./components/board/board.js";


const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};

/**
 * Отрисовка компонентов на странице
 */const init = () => {
  const filters = generateFilters();
  const tasks = generateTasks(CountTask.ALL);
  const boardComponent = new BoardComponent(tasks);

  render(Nodes.HEADER, new MenuComponent().getElement());
  render(Nodes.MAIN, new FiltersComponent(filters).getElement());
  render(Nodes.MAIN, boardComponent.getElement());
  renderBoard(boardComponent, tasks);
};

init();
