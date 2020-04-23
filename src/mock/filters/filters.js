import {FILTER_NAMES} from "../../consts";


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
  const tasksNotDelete = allTasks.filter((task) => !task.isDeleted);
  const tasksNotArchive = tasksNotDelete.filter((task) => !task.isArchive);
  switch (filterName) {
    case `all`:
      return tasksNotArchive.length;
    case `overdue`:
      return tasksNotArchive.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length;
    case `today`:
      return tasksNotArchive.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()).length;
    case `favorites`:
      return tasksNotArchive.filter((task) => task.isFavorite).length;
    case `repeating`:
      return tasksNotArchive.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
    case `archive`:
      return tasksNotDelete.filter((task) => task.isArchive).length;
    default:
      return 0;
  }
};


export {generateFilters};
