import {CountTask} from "../../../consts";
import {renderTask} from "../../task/helpers/helpers";
import {addLoadMoreListener} from "../components/load-more-button";

/**
 * Отрисовка блока доски задач
 * @param {Object} boardComponent доска задач
 * @param {Array} tasks задачи
 */
const renderBoard = (boardComponent, tasks) => {
  if (tasks.length) {
    const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
    let showingTasksCount = CountTask.START;

    const renderTasksList = () => (task) => renderTask(tasksList, task);

    tasks.slice(0, showingTasksCount).map(renderTasksList());

    addLoadMoreListener(boardComponent, tasks, showingTasksCount, renderTasksList);
  }
};

export {renderBoard};
