import {CountTask} from "../../consts";
import {remove, render} from "../../utils/change-component";


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Object} loadMoreComponent компонент
 * @param {Array} tasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 * @return {Function}
 */
const getLoadMoreListener = (loadMoreComponent, tasks, renderTasksList, showingTasksCount) => {
  return () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());
    if (showingTasksCount >= tasks.length) {
      remove(loadMoreComponent);
    }
  };
};


/**
 * Отрисовка компонента кнопки показа скрытых задач
 * @param {Object} container контейнер, в который отрисовывается компонент
 * @param {Object} loadMoreComponent компонент
 * @param {Array} tasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 */
const renderLoadMore = (container, loadMoreComponent, tasks, renderTasksList, showingTasksCount) => {
  if (showingTasksCount >= tasks.length) {
    return;
  }

  render(container, loadMoreComponent);

  loadMoreComponent.setClickHandler(getLoadMoreListener(loadMoreComponent, tasks, renderTasksList, showingTasksCount));
};


export {renderLoadMore};
