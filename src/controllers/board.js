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
 * Создание контроллера, обеспечивающего отрисовку компонентов доски
 */
export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = CountTask.START;

    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
    this._noTasks = new NoTasksComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._currentFilter = null;
  }

  render(allTasks, filtersComponent, currentFilter, showingTasksCount = CountTask.START) {
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

    const renderTasksList = () => (taskData) => {
      const taskController = new TaskController(tasksList, this._dataChangeHandler);
      taskController.render(taskData, this._tasks, filtersComponent, this._showingTasksCount, this);

      return taskController;
    };

    const sortedTasks = getSortedTasks(filteredTasks, this._sortComponent.getSortType());
    sortedTasks.slice(0, showingTasksCount).map(renderTasksList());

    this._renderLoadMore(container, sortedTasks, renderTasksList, showingTasksCount);

    this._sortComponent.setSortTypeChangeHandler(
        this._sortTypeChangeHandler(container, sortedTasks, renderTasksList, showingTasksCount, tasksList)
    );
  }

  _renderLoadMore(container, tasks, renderTasksList, showingTasksCount) {
    renderLoadMore(container, tasks, renderTasksList, showingTasksCount, this._loadMoreBtnComponent);
  }


  _sortTypeChangeHandler(container, sortedTasks, renderTasksList, showingTasksCount, tasksList) {
    renderSortedTasks(
        container, sortedTasks,
        renderTasksList, showingTasksCount,
        tasksList, this._loadMoreBtnComponent, this._sortComponent
    );
  }


  replace(allTasks, filtersComponent, currentFilter, showingTasksCount) {
    this.removeData();
    this.render(allTasks, filtersComponent, currentFilter, showingTasksCount);
  }


  removeData() {
    remove(this._tasksComponent);
    remove(this._sortComponent);
    remove(this._loadMoreBtnComponent);
    remove(this._noTasks);
  }
}
