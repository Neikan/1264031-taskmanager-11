import {CountTask, NO_TASKS} from "../consts";
import {renderTask} from "./task";
import {render} from "../utils/component-change";
import {getFilteringTasks} from "./filters";
import BoardComponent from "../components/board/board";


let showingTasksCount = CountTask.START;

/**
 * Отрисовка блока доски задач
 * @param {Object} boardComponent доска задач
 * @param {Array} tasks задачи
 * @param {Object} currentFilter
 * @param {Object} filtersComponent фильтры
 */
const renderBoard = (boardComponent, tasks, currentFilter, filtersComponent) => {
  const filteringTasks = getFilteringTasks(tasks, currentFilter);

  if (filteringTasks.length) {
    const renderTasksList = () => (taskData) =>
      renderTask(boardComponent, tasks, taskData, filtersComponent, showingTasksCount);

    filteringTasks.slice(0, showingTasksCount).map(renderTasksList());
    const loadMore = boardComponent.getElement().querySelector(`.load-more`);

    if (showingTasksCount >= filteringTasks.length && loadMore) {
      boardComponent.getElement().querySelector(`.load-more`).remove();
    } else if (loadMore) {
      addLoadMoreListener(boardComponent, filteringTasks, renderTasksList);
    }

  } else {
    removeBoard(boardComponent);
    boardComponent = new BoardComponent(NO_TASKS);
    render(document.querySelector(`.main`), boardComponent);
  }
};


/**
 * Удаление доски
 * @param {Object} boardComponent
 */
const removeBoard = (boardComponent) => {
  boardComponent.removeElement();
  document.querySelector(`.board.container`).remove();
};


/**
 * Перерисовка доски задач
 * @param {Array} filteringTasks задачи
 * @param {Object} boardComponent
 * @param {Object} currentFilter
 * @param {Number} tasksCount количество отображенных задач
 */
const reRenderBoard = (filteringTasks, boardComponent, currentFilter, tasksCount) => {
  removeBoard(boardComponent);

  boardComponent = new BoardComponent(filteringTasks);

  render(document.querySelector(`.main`), boardComponent);
  renderBoard(boardComponent, filteringTasks, currentFilter, tasksCount);
};


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Object} boardComponent доска
 * @param {Array} filteringTasks задачи
 * @param {Function} renderTasksList
 */
const addLoadMoreListener = (boardComponent, filteringTasks, renderTasksList) => {
  const loadMore = boardComponent.getElement().querySelector(`.load-more`);

  const loadMoreClickHandler = () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;
    filteringTasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());
    if (showingTasksCount >= filteringTasks.length) {
      loadMore.remove();
    }
  };

  loadMore.addEventListener(`click`, loadMoreClickHandler);
};


export {renderBoard, reRenderBoard};
