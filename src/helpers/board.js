import {CountTask, NO_TASKS, Position} from "../consts";
import {renderTask, checktArchiveTasks} from "./task";
import {render} from "../utils";
import BoardComponent from "../components/board/board";


/**
 * Отрисовка блока доски задач
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска задач
 * @param {Array} tasks задачи
 */
const renderBoard = (filtersComponent, boardComponent, tasks = NO_TASKS) => {
  const isAllTasksInArchive = tasks.every((task) => task.isArchive);

  if (tasks.length && !isAllTasksInArchive) {
    let showingTasksCount = CountTask.START;

    const renderTasksList = () => (task, index) => renderTask(filtersComponent, boardComponent, tasks, showingTasksCount, task, index);

    tasks.slice(0, showingTasksCount).map(renderTasksList());

    if (boardComponent.getElement().querySelector(`.load-more`)) {
      addLoadMoreListener(filtersComponent, boardComponent, tasks, showingTasksCount, renderTasksList);
    }
  }
};


/**
 * Пересоздание доски
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Array} tasks задачи
 */
const replaceBoard = (filtersComponent, boardComponent, tasks) => {
  boardComponent.getElement().remove();
  boardComponent.removeElement();
  boardComponent = new BoardComponent();
  const filtersNode = document.querySelector(`.main__filter`);
  render(filtersNode, boardComponent.getElement(), Position.AFTER_END);
  renderBoard(filtersComponent, boardComponent, tasks);
};


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Array} tasks задачи
 * @param {Number} showingTasksCount количество задач, ранее отображенных на доске
 * @param {Function} renderTasksList
 */
const addLoadMoreListener = (filtersComponent, boardComponent, tasks, showingTasksCount, renderTasksList) => {
  const loadMore = boardComponent.getElement().querySelector(`.load-more`);
  const loadMoreClickHandler = () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;
    tasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());
    if (showingTasksCount >= tasks.length) {
      loadMore.remove();
    }
    checktArchiveTasks(filtersComponent, boardComponent, tasks);
  };
  loadMore.addEventListener(`click`, loadMoreClickHandler);
};


export {renderBoard, replaceBoard};
