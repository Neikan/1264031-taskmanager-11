import {CountTask, Position} from "../../consts";
import {remove, render} from "../../utils/change-component";
import {renderTaskControllers} from "../../controllers/board";


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Array} tasks данные задач
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} tasksList список задач на доске
 * @param {Object} boardController контроллер доски
 * @return {Function}
 */
const getLoadMoreListener = (tasks, showingTasksCount, tasksList, boardController) => {
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
};


/**
 * Отрисовка компонента кнопки показа скрытых задач
 * @param {Object} container контейнер, в который отрисовывается компонент
 * @param {Array} tasks данные задач
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} tasksList
 * @param {Object} boardController контроллер доски
 */
const renderLoadMore = (container, tasks, showingTasksCount, tasksList, boardController) => {
  if (showingTasksCount >= tasks.length) {
    return;
  }

  render[Position.BEFORE_END](container, boardController._loadMoreBtnComponent);
  boardController._loadMoreBtnComponent.setClickHandler(
      getLoadMoreListener(tasks, showingTasksCount, tasksList, boardController));
};


export {renderLoadMore};
