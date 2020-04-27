import {CountTask} from "../../consts";
import {remove, render} from "../../utils/change-component";


/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {Object} loadMoreBtnComponent компонент
 * @param {Array} tasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 * @return {Function}
 */
const getLoadMoreListener = (loadMoreBtnComponent, tasks, renderTasksList, showingTasksCount) => {
  return () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());
    if (showingTasksCount >= tasks.length) {
      remove(loadMoreBtnComponent);
    }
  };
};


/**
 * Отрисовка компонента кнопки показа скрытых задач
 * @param {Object} container контейнер, в который отрисовывается компонент
 * @param {Array} tasks данные задач
 * @param {Function} renderTasksList функция рендера задач на доску
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} loadMoreBtnComponent компонент
 */
const renderLoadMore = (container, tasks, renderTasksList, showingTasksCount, loadMoreBtnComponent) => {
  if (showingTasksCount >= tasks.length) {
    return;
  }

  render(container, loadMoreBtnComponent);

  loadMoreBtnComponent.setClickHandler(getLoadMoreListener(loadMoreBtnComponent, tasks, renderTasksList, showingTasksCount));
};


export {renderLoadMore};
