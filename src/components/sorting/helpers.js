import {SortType} from "../../consts";
import {renderLoadMore} from "../load-more-btn/load-more-btn-helpers";

/**
 * Сортировка задач
 * @param {Array} filteredTasks данные задач
 * @param {string} sortType тип сортировки
 * @param {Number} from начальное количество зада
 * @param {Number} to конечное количество задач
 * @return {Array} отсортированные данные задач
 */
const getSortedTasks = (filteredTasks, sortType, from, to) => {
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

  return sortedTasks.slice(from, to);
};


const renderSortedTasks = (container, loadMoreComponent, filteredTasks, renderTasksList, showingTasksCount, sortComponent, tasksList) => {
  // console.log(showingTasksCount);
  const sortClickHandler = (sortType) => {
    // showingTasksCount = CountTask.BY_BUTTON;

    const sortedTasks = getSortedTasks(filteredTasks, sortType, 0, showingTasksCount);
    tasksList.innerHTML = ``;

    sortedTasks.slice(0, showingTasksCount).map(renderTasksList());
    renderLoadMore(container, loadMoreComponent, filteredTasks, renderTasksList, showingTasksCount);
  };

  sortComponent.setSortTypeChangeHandler(sortClickHandler);
};

export {renderSortedTasks};
