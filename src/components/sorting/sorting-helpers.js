import {SortType} from "../../consts";
import {renderLoadMore} from "../load-more-btn/load-more-btn-helpers";
import {getCurrentCountTasks} from "../task/task-helpers";
import {remove} from "../../utils/change-component";


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
 * @param {Object} loadMoreComponent компонент, отвечающий за кнопку показа оставшихся задач
 * @param {Array} filteredTasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} sortComponent компонент, отвечающий за сортировку задач
 * @param {Object} tasksList список задач
 */
const renderSortedTasks = (container, loadMoreComponent, filteredTasks, renderTasksList, showingTasksCount, sortComponent, tasksList) => {
  const sortClickHandler = (sortType) => {
    showingTasksCount = getCurrentCountTasks();

    const sortedTasks = getSortedTasks(filteredTasks, sortType);

    tasksList.innerHTML = ``;

    sortedTasks.slice(0, showingTasksCount).map(renderTasksList());

    remove(loadMoreComponent);
    renderLoadMore(container, loadMoreComponent, sortedTasks, renderTasksList, showingTasksCount);
  };

  sortComponent.setSortTypeChangeHandler(sortClickHandler);
};


export {renderSortedTasks};
