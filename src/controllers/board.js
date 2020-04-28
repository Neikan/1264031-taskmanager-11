import {render, remove} from "../utils/change-component";
import {CountTask} from "../consts";
import {getFilteredTasks} from "../components/filters/filters-helpers";
import {renderLoadMore} from "../components/load-more-btn/load-more-btn-helpers";
import {renderSortedTasks, getSortedTasks} from "../components/sorting/sorting-helpers";
import TasksComponent from "../components/tasks-list/tasks-list";
import SortComponent from "../components/sorting/sorting";
import LoadMoreBtnComponent from "../components/load-more-btn/load-more-btn";
import NoTasksComponent from "../components/no-tasks/no-tasks";
import TaskController from "./task.js";


/**
 * Создание контроллера, обеспечивающего отрисовку задач
 * @param {Object} tasksList список задач на доске
 * @param {Array} tasks данные задач
 * @param {Function} boardController контроллер доски
 * @return {Object} созданный контроллер
 */
const renderTasks = (tasksList, tasks, boardController) => {
  return tasks.map((task) => {
    const taskController = new TaskController(tasksList, boardController);
    taskController.render(task);

    return taskController;
  });
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов доски
 */
export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTasks = [];
    this._showingTasksCount = CountTask.START;
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
    this._noTasks = new NoTasksComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._currentFilter = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._removeData = this._removeData.bind(this);
  }


  render(allTasks, currentFilter, showingTasksCount = CountTask.START) {
    this._tasks = allTasks;
    const container = this._container.getElement();
    this._currentFilter = currentFilter;
    const filteredTasks = getFilteredTasks(this._tasks, this._currentFilter);

    if (!filteredTasks.length) {
      render(container, this._noTasks);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);
    const tasksList = this._tasksComponent.getElement();

    const sortedTasks = getSortedTasks(filteredTasks, this._sortComponent.getSortType());
    const newTasks = renderTasks(tasksList, sortedTasks.slice(0, showingTasksCount), this);

    this._showedTasks = this._showedTasks.concat(newTasks);
    this._renderLoadMore(container, sortedTasks, showingTasksCount, tasksList);

    this._sortComponent.setSortTypeChangeHandler(
        this._sortTypeChangeHandler(container, sortedTasks, showingTasksCount, tasksList)
    );
  }


  _renderLoadMore(container, tasks, showingTasksCount, tasksList) {
    renderLoadMore(container, tasks, showingTasksCount, tasksList, this);
  }


  _sortTypeChangeHandler(container, sortedTasks, showingTasksCount, tasksList) {
    renderSortedTasks(container, sortedTasks, showingTasksCount, tasksList, this);
  }


  _dataChangeHandler(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));
    taskController.render(this._tasks[index]);
  }


  _viewChangeHandler() {
    this._showedTasks.forEach((it) => it.setDefaultView());
  }


  replace(allTasks, currentFilter, showingTasksCount) {
    this._removeData();
    this.render(allTasks, currentFilter, showingTasksCount);
  }


  _removeData() {
    remove(this._tasksComponent);
    remove(this._sortComponent);
    remove(this._loadMoreBtnComponent);
    remove(this._noTasks);
  }
}


export {renderTasks};
