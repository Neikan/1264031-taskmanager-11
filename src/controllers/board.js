import {render, remove} from "../utils/change-component";
import {getIndex} from "../utils/common";
import {CountTask, Position} from "../consts";
import {getFilteredTasks} from "./filters";
import {getSortedTasks} from "../components/sorting";
import {Tasks} from "../components/tasks-list";
import {Sort} from "../components/sorting";
import {LoadMoreBtn} from "../components/load-more-btn";
import {NoTasks} from "../components/no-tasks";
import {TaskController} from "./task.js";


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
  constructor(container, tasksModel) {
    this._container = container;

    this._tasks = [];
    this._tasksModel = tasksModel;
    this._taskControllers = [];
    this._sorting = new Sort();
    this._boardTasks = new Tasks();
    this._loadMoreBtn = new LoadMoreBtn();
    this._noTasks = new NoTasks();
    this._countTasks = null;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий отрисовку данных задач
   * @param {Number} сountTasks текущее количество показанных задач
   */
  render(сountTasks = CountTask.START) {
    this._tasks = this._tasksModel.getTasksData();
    const filteredTasks = this._tasksModel.getFilteredTasks();
    const container = this._container.getElement();

    if (!filteredTasks.length) {
      render[Position.BEFORE_END](container, this._noTasks);
      return;
    }

    this._renderBoardTasks(
        this._getDataSet(
            container,
            getSortedTasks(filteredTasks, this._sorting.getSortType()),
            this._boardTasks.getElement(),
            0,
            сountTasks
        )
    );
  }


  /**
   * Метод, обеспечивающий перерисовку доски при изменениях
   * @param {Number} countTasks текущее количество показанных задач
   */
  rerender(countTasks = this._countTasks) {
    this._removeData();
    this.render(countTasks);
  }


  /**
   * Метод, собирающий данные для отрисовки в единый объект
   * @param {Object} container контейнер контроллера
   * @param {Array} sortedTasks данные отсортированных задач
   * @param {Object} tasksList список задач в компоненте-контейнере задач
   * @param {Number} countTasksPrev предыдущее количество показанных задач
   * @param {Number} countTasks текущее количество показанных задач
   * @return {Object} созданный объект
   */
  _getDataSet(container, sortedTasks, tasksList, countTasksPrev, countTasks) {
    return {
      container, sortedTasks, tasksList, countTasksPrev, countTasks
    };
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-контейнера доски задач
   * @param {Object} dataset объект с данными
   */
  _renderBoardTasks(dataset) {
    render[Position.BEFORE_END](dataset.container, this._boardTasks);
    this._renderSorting(dataset);
    this._renderTaskControllers(dataset);
    this._renderLoadMore(dataset);
  }


  /**
   * Метод, обеспечивающий создание и отрисовку контроллеров форм задач
   * @param {Object} dataset объект с данными
   */
  _renderTaskControllers({sortedTasks, tasksList, countTasksPrev, countTasks}) {
    this._taskControllers = this._taskControllers.concat(
        renderTaskControllers(tasksList, sortedTasks.slice(countTasksPrev, countTasks),
            this._viewChangeHandler, this._dataChangeHandler
        )
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента сортировки и добавление слушателей на него
   * @param {Object} dataset объект с данными
   */
  _renderSorting(dataset) {
    render[Position.AFTER_BEGIN](dataset.container, this._sorting);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler(dataset));
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-кнопки показа скрытых задач
   * @param {Object} dataset объект с данными
   */
  _renderLoadMore(dataset) {
    if (dataset.countTasks >= dataset.sortedTasks.length) {
      return;
    }

    render[Position.BEFORE_END](dataset.container, this._loadMoreBtn);
    this._loadMoreBtn.setClickHandler(this._loadMoreClickHandler(dataset));
  }


  /**
   * Метод, обеспечивающий обновление исходных данных задач
   * @param {Number} index индекс задачи в массиве данных задач
   * @param {Object} newData новые данные задачи
   */
  _updateTasksData(index, newData) {
    const newTasksData = this._tasks.slice();
    newTasksData[index] = newData;
    this._tasks = newTasksData;
  }


  /**
   * Метод, обепечивающий сброс данных для выполнения ререндера
   */
  _removeData() {
    this._taskControllers = [];
    remove(this._boardTasks);
    remove(this._sorting);
    remove(this._loadMoreBtn);
    remove(this._noTasks);
  }


  /**
   * Метод, обеспечивающий обновление контроллера форм задачи на основе новых данных
   * @param {Object} oldData прежние данные задачи
   * @param {Object} newData обновленные данные задачи
   */
  _dataChangeHandler(oldData, newData) {
    let index = getIndex(this._tasks, oldData);

    if (index === -1) {
      return;
    }

    this._updateTasksData(index, newData);
    this._countTasks = this._taskControllers.length;
    this.rerender();
  }


  /**
   * Метод, обеспечивающий отображение каждого контроллера форм задачи в режиме по умолчанию
   */
  _viewChangeHandler() {
    this._taskControllers.map((taskController) => taskController.setDefaultView());
  }


  /**
   * Метод, создающий помощника для выполнения сортировки
   * @param {Object} dataset объект с данными
   * @return {Function} созданный помощник
   */
  _sortTypeChangeHandler(dataset) {
    return () => {
      this._countTasks = dataset.countTasks;
      this._removeData();
      this._renderBoardTasks(
          this._getDataSet(
              dataset.container,
              getSortedTasks(getFilteredTasks(
                  this._tasks, this._tasksModel.getFilter()), this._sorting.getSortType()
              ),
              this._boardTasks.getElement(),
              0,
              this._countTasks));
    };
  }


  /**
   * Метод, создающий помощника для отображения скрытых задач
   * @param {Object} dataset объект с данными
   * @return {Function} созданный помощник
   */
  _loadMoreClickHandler(dataset) {
    return () => {
      dataset.countTasksPrev = dataset.countTasks;
      dataset.countTasks += CountTask.BY_BUTTON;

      this._renderTaskControllers(dataset);

      if (dataset.countTasks >= dataset.sortedTasks.length) {
        remove(this._loadMoreBtn);
      }
    };
  }
}


export {BoardController};
