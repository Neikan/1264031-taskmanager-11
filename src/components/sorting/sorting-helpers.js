import {SortType} from "../../consts";
import {renderLoadMore} from "../load-more-btn/load-more-btn-helpers";
import {remove} from "../../utils/change-component";
import {getCurrentCountTasks} from "../../utils/common";


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
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} tasksList список задач
 * @param {Object} loadMoreBtnComponent компонент, отвечающий за кнопку показа оставшихся задач
 * @param {Object} sortComponent компонент, отвечающий за сортировку задач
 */
const renderSortedTasks = (container, filteredTasks, renderTasksList, showingTasksCount, tasksList, loadMoreBtnComponent, sortComponent) => {
  const sortClickHandler = (sortType) => {
    showingTasksCount = getCurrentCountTasks();

    const sortedTasks = getSortedTasks(filteredTasks, sortType);

    tasksList.innerHTML = ``;

    sortedTasks.slice(0, showingTasksCount).map(renderTasksList());

    remove(loadMoreBtnComponent);
    renderLoadMore(container, sortedTasks, renderTasksList, showingTasksCount, loadMoreBtnComponent);
  };

  sortComponent.setSortTypeChangeHandler(sortClickHandler);
};


export {renderSortedTasks, getSortedTasks};
