import {FILTER_NAMES} from "../../consts";
import {filterRules, getTasksForFilters} from "../../utils/common";


const FILTER_NAME = `archive`;

/**
 * Генерация фильтров
 * @param {Array} allTasks данные задач
 * @return {Object} фильтр с названием и числом элементов, соответствующих ему
 */
const generateFilters = (allTasks) => FILTER_NAMES.map((filter) => addCount(allTasks, filter));


/**
 * Добавление свойства количества к элементу фильтра
 * @param {Array} allTasks данные задач
 * @param {Object} filter фильтр
 * @return {Object} объект с добавленным свойством количества
 */
const addCount = (allTasks, filter) => {
  filter[`count`] = getFiltersCount(allTasks, filter.name);
  return filter;
};


/**
 * Вычисление количества задач по каждому фильтру
 * @param {Array} allTasks данные задач
 * @param {Object} filterName название фильтра
 * @return {Number} количество задач, соответствующих фильтру
 */
const getFiltersCount = (allTasks, filterName) => {
  const {tasksNotDelete, tasksNotArchive} = getTasksForFilters(allTasks);

  return (filterName === FILTER_NAME) ?
    filterRules[filterName](tasksNotDelete).length :
    filterRules[filterName](tasksNotArchive).length;
};


export {generateFilters};
