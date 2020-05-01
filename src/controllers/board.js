import {render, remove} from "../utils/change-component";
import {CountTask, Position} from "../consts";
import {getFilteredTasks} from "./filters";
import {getSortedTasks} from "../components/sorting/sorting";
import TasksComponent from "../components/tasks-list/tasks-list";
import {Sort} from "../components/sorting/sorting";
import {LoadMoreBtn} from "../components/load-more-btn/load-more-btn";
import NoTasksComponent from "../components/no-tasks/no-tasks";
import TaskController from "./task.js";
import {getCurrentCountTasks} from "../utils/common";


/**
 * Создание контроллера, обеспечивающего отрисовку задач
 * @param {Object} tasksList список задач на доске
 * @param {Array} tasks данные задач
 * @param {Function} viewChangeHandler метод контроллера доски,
 *  обеспечивающий установку представления задачи в режим по умолчанию
 * @param {Function} dataChangeHandler метод контроллера доски,
 *  обеспечивающий изменение данных задачи и перерисовку текущего представления
 * @return {Array} массив контроллеров представлений задач
 */
const renderTaskControllers = (tasksList, tasks, viewChangeHandler, dataChangeHandler) => {
  return tasks.map((task) => {
    const taskController = new TaskController(tasksList, viewChangeHandler, dataChangeHandler);
    taskController.render(task);

    return taskController;
  });
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов доски
 */
class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._countTasks = null;
    this._sortComponent = new Sort();
    this._tasksComponent = new TasksComponent();
    this._loadMoreBtnComponent = new LoadMoreBtn();
    this._noTasks = new NoTasksComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._currentFilter = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий отрисовку данных задач
   * @param {Array} allTasks данные задач
   * @param {string} currentFilter текущий примененный фильтр
   * @param {Number} showingTasksCount текущее количество показанных задач
   */
  render(allTasks, currentFilter, showingTasksCount = CountTask.START) {
    this._tasks = allTasks;
    this._currentFilter = currentFilter;
    const filteredTasks = getFilteredTasks(this._tasks, this._currentFilter);
    const container = this._container.getElement();

    if (!filteredTasks.length) {
      render[Position.BEFORE_END](container, this._noTasks);
      return;
    }

    this._countTasks = showingTasksCount;
    render[Position.BEFORE_END](container, this._tasksComponent);

    const tasksList = this._tasksComponent.getElement();

    const sortedTasks = getSortedTasks(filteredTasks, this._sortComponent.getSortType());
    const newTaskControllers = renderTaskControllers(tasksList,
        sortedTasks.slice(0, showingTasksCount), this._viewChangeHandler, this._dataChangeHandler);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTaskControllers);

    this._renderLoadMore(container, sortedTasks, showingTasksCount, tasksList);

    render[Position.AFTER_BEGIN](container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(
        this._sortTypeChangeHandler(container, sortedTasks, showingTasksCount, tasksList)
    );
  }


  /**
   * Метод, обеспечивающий перерисовку доски при изменении задач
   * @param {string} currentFilter текущий примененный фильтр
   * @param {Number} showingTasksCount текущее количество показанных задач
   */
  rerender(currentFilter = this._currentFilter, showingTasksCount = this._showingTasksCount) {
    this._removeData();
    this.render(this._tasks, currentFilter, showingTasksCount);
  }


  _renderLoadMore(container, tasks, showingTasksCount, tasksList) {
    if (showingTasksCount >= tasks.length) {
      return;
    }

    render[Position.BEFORE_END](container, this._loadMoreBtnComponent);
    this._loadMoreBtnComponent.setClickHandler(
        this._loadMoreClickHandler(tasks, showingTasksCount, tasksList, this));
  }

  _loadMoreClickHandler(tasks, showingTasksCount, tasksList, boardController) {
    return () => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount += CountTask.BY_BUTTON;

      const newTaskControllers = renderTaskControllers(
          tasksList, tasks.slice(prevTasksCount, showingTasksCount),
          boardController._viewChangeHandler, boardController._dataChangeHandler
      );
      boardController._showedTaskControllers =
          boardController._showedTaskControllers.concat(newTaskControllers);

      if (showingTasksCount >= tasks.length) {
        remove(boardController._loadMoreBtnComponent);
      }
    };
  }


  _sortTypeChangeHandler(container, sortedTasks, showingTasksCount, tasksList) {
    return () => {
      showingTasksCount = getCurrentCountTasks();

      tasksList.innerHTML = ``;
      this._showedTaskControllers = renderTaskControllers(
          tasksList, sortedTasks.slice(0, showingTasksCount),
          this._viewChangeHandler, this._dataChangeHandler
      );

      remove(this._loadMoreBtnComponent);
      this._renderLoadMore(container, sortedTasks, showingTasksCount, tasksList, this);
    };
  }


  /**
   * Метод, обеспечивающий обновление контроллера форм задачи на основе новых данных
   * @param {Object} oldData прежние данные задачи
   * @param {Object} newData обновленные данные задачи
   */
  _dataChangeHandler(oldData, newData) {
    let index = getTaskIndex(this._tasks, oldData);

    if (index === -1) {
      return;
    }

    const newTasksData = this._tasks.slice();
    newTasksData[index] = newData;
    this._tasks = newTasksData;

    this._showingTasksCount = this._showedTaskControllers.length;
    this.rerender();
  }


  /**
   * Метод, обеспечивающий отображение каждого контроллера форм задачи в режиме по умолчанию
   */
  _viewChangeHandler() {
    this._showedTaskControllers.map((taskData) => taskData.setDefaultView());
  }


  /**
   * Метод, обепечивающий сброс данных для выполнения ререндера
   */
  _removeData() {
    this._showedTaskControllers = [];
    remove(this._tasksComponent);
    remove(this._sortComponent);
    remove(this._loadMoreBtnComponent);
    remove(this._noTasks);
  }
}


/**
 * Получение индекса задачи
 * @param {Array} allTasks данные задач
 * @param {Object} taskData данные задачи
 * @return {Number} индекс задачи
 */
const getTaskIndex = (allTasks, taskData) => allTasks.indexOf(taskData);


export {BoardController, renderTaskControllers};
