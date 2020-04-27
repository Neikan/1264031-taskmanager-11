import {render, remove} from "../utils/change-component";
import {CountTask} from "../consts";
import {getFilteredTasks} from "../components/filters/filters-helpers";
import {renderTask} from "../components/task/task-helpers";
import {renderLoadMore} from "../components/load-more-btn/load-more-btn-helpers";
import {renderSortedTasks} from "../components/sorting/sorting-helpers";
import TasksComponent from "../components/tasks-list/tasks-list";
import SortComponent from "../components/sorting/sorting";
import LoadMoreBtnComponent from "../components/load-more-btn/load-more-btn";
import NoTasksComponent from "../components/no-tasks/no-tasks";


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов доски
 */
export default class BoardController {
  constructor(container, currentFilter) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = CountTask.START;

    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
    this._noTasks = new NoTasksComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);

    this._currentFilter = currentFilter;
  }

  render(allTasks, filtersComponent, currentFilter, showingTasksCount = CountTask.START) {
    this._tasks = allTasks;
    const container = this._container.getElement();
    const filteredTasks = getFilteredTasks(this._tasks, currentFilter);

    if (!filteredTasks.length) {
      render(container, this._noTasks);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const tasksList = this._tasksComponent.getElement();

    const renderTasksList = () => (taskData) =>
      renderTask(tasksList, allTasks, taskData, filtersComponent, showingTasksCount, this);

    filteredTasks.slice(0, showingTasksCount).map(renderTasksList());

    renderLoadMore(
        container, this._loadMoreBtnComponent, filteredTasks, renderTasksList, showingTasksCount
    );

    this._renderLoadMore();

    renderSortedTasks(
        container, this._loadMoreBtnComponent, filteredTasks,
        renderTasksList, showingTasksCount,
        this._sortComponent, tasksList
    );
  }

  _renderLoadMore() {}


  _sortTypeChangeHandler() {}


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
