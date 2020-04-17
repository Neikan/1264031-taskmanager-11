import {FILTER_NAMES} from "../../consts";


/**
 * Генерация фильтров
 * @param {Array} tasks массив задач
 * @return {Object} фильтр с названием и числом элементов, соответствующих ему
 */
const generateFilters = (tasks) => FILTER_NAMES.map((filter) => addCount(tasks, filter));


/**
 * Добавление свойства количества к элементу фильтра
 * @param {Array} tasks массив задач
 * @param {Object} filter фильтр
 * @return {Object} объект с добавленным свойством количества
 */
const addCount = (tasks, filter) => {
  filter[`count`] = getFiltersCount(tasks, filter.name);
  return filter;
};


/**
 * Вычисление количества задач по каждому фильтру
 * @param {Array} tasks массив задач
 * @param {Object} filterName название фильтра
 * @return {Number} количество задач, соответствующих фильтру
 */
const getFiltersCount = (tasks, filterName) => {
  switch (filterName) {
    case `all`:
      return tasks.length;
    case `overdue`:
      return tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length;
    case `today`:
      return tasks.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()).length;
    case `favorites`:
      return tasks.filter((task) => task.isFavorite).length;
    case `repeating`:
      return tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
    case `archive`:
      return tasks.filter((task) => task.isArchive).length;
    default:
      return 0;
  }
};


export {generateFilters};
