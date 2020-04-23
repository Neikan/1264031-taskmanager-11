import {CountTask} from "../../consts";
import {remove, render} from "../../utils/change-component";


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Object} loadMore компонент
 * @param {Array} filteredTasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 */
const addLoadMoreListener = (loadMore, filteredTasks, renderTasksList, showingTasksCount) => {
  const loadMoreClickHandler = () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;

    filteredTasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());
    if (showingTasksCount >= filteredTasks.length) {
      remove(loadMore);
    }
  };

  loadMore.setClickHandler(loadMoreClickHandler);
};


/**
 * Отрисовка компонента кнопки показа скрытых задач
 * @param {Object} container контейнер, в который отрисовывается компонент
 * @param {Object} loadMore компонент
 * @param {Array} filteredTasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 */
const renderLoadMore = (container, loadMore, filteredTasks, renderTasksList, showingTasksCount) => {
  if (showingTasksCount >= filteredTasks.length) {
    return;
  }

  render(container, loadMore);

  addLoadMoreListener(loadMore, filteredTasks, renderTasksList, showingTasksCount);
};


export {renderLoadMore};
