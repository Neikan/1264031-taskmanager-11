import {SortType} from "../../consts";
import {renderLoadMore} from "../load-more-btn/load-more-btn-helpers";
import {remove} from "../../utils/change-component";
import {getCurrentCountTasks} from "../../utils/common";
import {renderTasks} from "../../controllers/board";


/**
 * Сортировка задач
 * @param {Array} filteredTasks данные задач
 * @param {string} sortType тип сортировки
 * @return {Array} отсортированные данные задач
 */
const getSortedTasks = (filteredTasks, sortType) => {
  let sortedTasks = [];
  const showingTasks = filteredTasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks;
};


/**
 * Отрисовка отсортированных задач
 * @param {Object} container контейнер
 * @param {Array} filteredTasks данные задач
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} tasksList список задач
 * @param {Object} boardController
 */
const renderSortedTasks = (container, filteredTasks, showingTasksCount, tasksList, boardController) => {
  const sortClickHandler = (sortType) => {
    showingTasksCount = getCurrentCountTasks();
    const sortedTasks = getSortedTasks(filteredTasks, sortType);

    tasksList.innerHTML = ``;
    const newTasks = renderTasks(tasksList, sortedTasks.slice(0, showingTasksCount), boardController);

    boardController._showedTasks = boardController._showedTasks.concat(newTasks);

    remove(boardController._loadMoreBtnComponent);
    renderLoadMore(container, sortedTasks, showingTasksCount, tasksList, boardController);
  };

  boardController._sortComponent.setSortTypeChangeHandler(sortClickHandler);
};


export {renderSortedTasks, getSortedTasks};
