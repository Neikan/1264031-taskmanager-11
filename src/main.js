import {CountTask, Form, KeyCode} from "./consts";
import {generateTasks} from "./mock/tasks/tasks";
import {generateFilters} from "./mock/filters/filters";
import MenuComponent from "./components/menu.js";
import FiltersComponent from "./components/filters.js";
import BoardComponent from "./components/board.js";
import TaskComponent from "./components/board/task.js";
import {render} from "./utils";

const Nodes = {
  HEADER: document.querySelector(`.control`),
  MAIN: document.querySelector(`.main`),
};

const renderBoard = (boardComponent, tasks) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = CountTask.START;

  const renderTasksList = () => (task) => renderTask(tasksList, task);

  tasks.slice(0, showingTasksCount).map(renderTasksList());

  const loadMore = boardComponent.getElement().querySelector(`.load-more`);

  const loadMoreClickHandler = () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());

    if (showingTasksCount >= tasks.length) {
      loadMore.remove();
    }
  };

  loadMore.addEventListener(`click`, loadMoreClickHandler);
};

const renderTask = (tasksList, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskComponent(task, Form.EDIT);

  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`);
  const editBtnClickHandler = () => {
    tasksList.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keydown`, escKeyDownHandler);
  };
  editBtn.addEventListener(`click`, editBtnClickHandler);

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    tasksList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };
  editForm.addEventListener(`submit`, editFormSubmitHandler);


  const replaceEditToTask = () => {
    tasksList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };
  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  render(tasksList, taskComponent.getElement());
};

/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const filters = generateFilters();
  const tasks = generateTasks(CountTask.ALL);
  const boardComponent = new BoardComponent();

  render(Nodes.HEADER, new MenuComponent().getElement());
  render(Nodes.MAIN, new FiltersComponent(filters).getElement());
  render(Nodes.MAIN, boardComponent.getElement());
  renderBoard(boardComponent, tasks);
};

init();
