import {FILTER_NAMES, CountTask} from "../../consts";

/**
 * Генерация фильтров
 * @return {Object} фильтр с названием и числом элементов, соответствующих ему
 */
const generateFilters = () => FILTER_NAMES.map(addCount);

/**
 * Добавление свойства количества к элементу фильтра
 * @param {Object} filter фильтр
 * @return {Object} объект с добавленным свойством количества
 */
const addCount = (filter) => {
  filter[`count`] = Math.floor(Math.random() * CountTask.ALL);
  return filter;
};

export {generateFilters};
