import {render, remove} from "../utils/change-component";
import {CountTask} from "../consts";
import {getFilteredTasks} from "../components/filters/filters-helpers";
import {renderTask} from "../components/task/task-helpers";
import {renderLoadMore} from "../components/load-more-btn/load-more-btn-helpers";
import TasksComponent from "../components/tasks-list/tasks-list";
import SortComponent from "../components/sorting/sorting";
import LoadMoreBtnComponent from "../components/load-more-btn/load-more-btn";
import NoTasksComponent from "../components/no-tasks/no-tasks";
import {renderSortedTasks} from "../components/sorting/helpers";


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
    this._noTasks = new NoTasksComponent();
  }

  render(allTasks, filtersComponent, currentFilter, countTasks = CountTask.START) {

    const container = this._container.getElement();
    const filteredTasks = getFilteredTasks(allTasks, currentFilter);

    if (filteredTasks.length) {
      let showingTasksCount = countTasks;

      render(container, this._sortComponent);
      render(container, this._tasksComponent);

      const tasksList = this._tasksComponent.getElement();

      const renderTasksList = () => (taskData) =>
        renderTask(tasksList, allTasks, taskData, filtersComponent, showingTasksCount, this);

      filteredTasks.slice(0, showingTasksCount).map(renderTasksList());

      renderLoadMore(
          container, this._loadMoreBtnComponent, filteredTasks, renderTasksList, showingTasksCount
      );

      renderSortedTasks(
          container, this._loadMoreBtnComponent, filteredTasks,
          renderTasksList, showingTasksCount,
          this._sortComponent, tasksList
      );

    } else {
      this.removeData();
      render(container, this._noTasks);
    }
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
