import {CountTask, Form, DEFAULT_FILTER} from "../consts";
import {renderTask} from "./task";
import {render} from "../utils";
import BoardComponent from "../components/board/board";
import {getFilteringTasks} from "./filters";


/**
 * Отрисовка блока доски задач
 * @param {Object} boardComponent доска задач
 * @param {Array} tasks задачи
 * @param {Object} boardFilter
 * @param {Object} filtersComponent фильтры
 */
const renderBoard = (boardComponent, tasks, boardFilter = DEFAULT_FILTER, filtersComponent) => {
  const filteringTasks = getFilteringTasks(tasks, boardFilter);
  if (tasks.length > 0) {
    let showingTasksCount = CountTask.START;

    const renderTasksList = () => (taskData, taskIndex) =>
      renderTask(boardComponent, tasks, taskData, taskIndex, Form.VIEW, filtersComponent);

    filteringTasks.slice(0, showingTasksCount).map(renderTasksList());

    if (boardComponent.getElement().querySelector(`.load-more`)) {
      addLoadMoreListener(boardComponent, filteringTasks, showingTasksCount, renderTasksList);
    }
  }
};


const removeBoard = (boardComponent) => {
  boardComponent.removeElement();
  document.querySelector(`.board.container`).remove();
};


/**
 * Перерисовка доски задач
 * @param {Array} filteringTasks задачи
 * @param {Object} boardComponent
 * @param {Object} attributeFor
 */
const reRenderBoard = (filteringTasks, boardComponent, attributeFor) => {
  removeBoard(boardComponent);

  boardComponent = new BoardComponent(filteringTasks);

  render(document.querySelector(`.main`), boardComponent.getElement());
  renderBoard(boardComponent, filteringTasks, attributeFor);
};


// const reRenderBoardWithEditTask = (tasks, boardComponent, currentTaskIndex, currentRenderedTasks) => {
//   removeBoard(boardComponent);

//   boardComponent = new BoardComponent(tasks);
//   render(document.querySelector(`.main`), boardComponent.getElement());
//   const renderTasksList = () => (taskData, taskIndex) => renderTask(boardComponent, tasks, taskData, taskIndex, Form.VIEW);

//   tasks.slice(0, currentTaskIndex).map(renderTasksList());
// renderTask(boardComponent, tasks, tasks[currentTaskIndex], currentTaskIndex, Form.EDIT);
// tasks.slice(currentTaskIndex + 1, currentRenderedTasks).map(renderTasksList());

// if (boardComponent.getElement().querySelector(`.load-more`)) {
//   addLoadMoreListener(boardComponent, tasks, currentRenderedTasks, renderTasksList);
// }

// return boardComponent;
// };

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
