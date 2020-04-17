import {CountTask, NO_TASKS, Position} from "../../../consts";
import {renderTask} from "../../task/helpers/helpers";
import {addLoadMoreListener} from "../components/load-more-button";
import {render} from "../../../utils";
import BoardComponent from "./../board";

/**
 * Отрисовка блока доски задач
 * @param {Object} boardComponent доска задач
 * @param {Array} tasks задачи
 */
const renderBoard = (boardComponent, tasks = NO_TASKS) => {
  const isAllTasksInArchive = tasks.every((task) => task.isArchive);

  if (tasks.length && !isAllTasksInArchive) {
    let showingTasksCount = CountTask.START;

    const renderTasksList = () => (task) => renderTask(boardComponent, tasks, showingTasksCount, task);

    tasks.slice(0, showingTasksCount).map(renderTasksList());

    if (boardComponent.getElement().querySelector(`.load-more`)) {
      addLoadMoreListener(boardComponent, tasks, showingTasksCount, renderTasksList);
    }
  }
};

/**
 * Пересоздание доски
 * @param {Object} boardComponent доска
 * @param {Array} tasks задачи
 */
const replaceBoard = (boardComponent, tasks = NO_TASKS) => {
  boardComponent.getElement().remove();
  boardComponent = new BoardComponent();
  const filtersNode = document.querySelector(`.main__filter`);
  render(filtersNode, boardComponent.getElement(), Position.AFTER_END);
  renderBoard(boardComponent, tasks);
};

export {renderBoard, replaceBoard};
