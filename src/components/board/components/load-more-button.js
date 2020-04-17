import {CountTask, IsExistence} from "../../../consts";


/**
 * Создание разметки кнопки показа оставшихся задач
 * @param {Array} tasks
 * @return {string} разметка кнопки
 */
const createLoadMore = (tasks) => {
  const moreTasksThanStart = (tasks.length > CountTask.START) ? IsExistence.YES : IsExistence.No;

  return moreTasksThanStart ?
    `<button class="load-more" type="button">load more</button>` :
    ``;
};


export {createLoadMore};
