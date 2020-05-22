import TasksModel from "./models/tasks";
import {CountTask, Position, FilterType} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {generateFilters} from "./mock/filters/filters";
import {render} from "./utils/change-component";
import {Menu} from "./components/menu.js";
import {Filters} from "./components/filters.js";
import {Board} from "./components/board.js";
import {BoardController} from "./controllers/board.js";
import {setCheckFilter, addListenersToFilters} from "./controllers/filters";


const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const tasks = generateTasks(CountTask.ALL);

  const tasksModel = new TasksModel();
  tasksModel.setTasksData(tasks);

  const filtersComponent = new Filters(generateFilters(tasksModel.getTasksData()));
  const boardComponent = new Board();
  const boardController = new BoardController(boardComponent, tasksModel);

  render[Position.BEFORE_END](Nodes.HEADER, new Menu());
  render[Position.BEFORE_END](Nodes.MAIN, filtersComponent);
  render[Position.BEFORE_END](Nodes.MAIN, boardComponent);

  setCheckFilter(FilterType.DEFAULT);
  boardController.render();

  addListenersToFilters(tasksModel, filtersComponent, boardController);
};


init();
