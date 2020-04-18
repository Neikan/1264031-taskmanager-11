import {CountTask, Form, NO_TASKS} from "../consts";
import {renderTask} from "./task";
import {render} from "../utils";
import {getFilteringTasks} from "./filters";
import BoardComponent from "../components/board/board";


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
    let showingTasksCount = CountTask.START;

    const renderTasksList = () => (taskData, taskIndex) =>
      renderTask(boardComponent, tasks, taskData, taskIndex, Form.VIEW, filtersComponent);

    filteringTasks.slice(0, showingTasksCount).map(renderTasksList());
    const loadMore = boardComponent.getElement().querySelector(`.load-more`);

    if (showingTasksCount >= filteringTasks.length && loadMore) {
      boardComponent.getElement().querySelector(`.load-more`).remove();
    } else if (loadMore) {
      addLoadMoreListener(boardComponent, filteringTasks, showingTasksCount, renderTasksList);
    }

  } else {
    removeBoard(boardComponent);
    boardComponent = new BoardComponent(NO_TASKS);
    render(document.querySelector(`.main`), boardComponent.getElement());
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
 */
const reRenderBoard = (filteringTasks, boardComponent, currentFilter) => {
  removeBoard(boardComponent);

  boardComponent = new BoardComponent(filteringTasks);

  render(document.querySelector(`.main`), boardComponent.getElement());
  renderBoard(boardComponent, filteringTasks, currentFilter);
};


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Object} boardComponent доска
 * @param {Array} filteringTasks задачи
 * @param {Number} showingTasksCount количество задач, ранее отображенных на доске
 * @param {Function} renderTasksList
 */
const addLoadMoreListener = (boardComponent, filteringTasks, showingTasksCount, renderTasksList) => {
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
