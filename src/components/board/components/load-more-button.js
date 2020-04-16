import {CountTask} from "../../../consts";

/**
 * Создание разметки кнопки показа оставшихся задач
 * @return {string} разметка кнопки
 */
const createLoadMore = () => `<button class="load-more" type="button">load more</button>`;

/**
 * Добавление лисенера на кнопку показа оставшихся задач
 * @param {*} boardComponent компонент доски
 * @param {Array} tasks задачи
 * @param {Number} showingTasksCount количество задач, ранее отображенных на доске
 * @param {Function} renderTasksList
 */
const addLoadMoreListener = (boardComponent, tasks, showingTasksCount, renderTasksList) => {
  const loadMore = boardComponent.getElement().querySelector(`.load-more`);
  const loadMoreClickHandler = () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += CountTask.BY_BUTTON;
    tasks.slice(prevTasksCount, showingTasksCount).map(renderTasksList());
    if (showingTasksCount >= tasks.length) {
      loadMore.remove();
    }
  };
  loadMore.addEventListener(`click`, loadMoreClickHandler);
};

export {createLoadMore, addLoadMoreListener};
