import {Position, FILTER_LABEL} from "../consts";
import {generateFilters} from "../mock/filters/filters";
import {render} from "../utils";
import {reRenderBoard} from "./../helpers/board";
import FiltersComponent from "./../components/filters/filters";


/**
 * Пересоздание компонента фильтров с обновленным массивом задач
 * @param {Object} filtersComponent фильтры
 * @param {Array} tasks задачи
 * @param {Object} boardComponent доска задач
 * @param {string} currentFilter текущий фильтр
 */
const regenerateFilters = (filtersComponent, tasks, boardComponent, currentFilter) => {
  document.querySelector(`.filter.container`).remove();
  const mainNode = document.querySelector(`.main__control`);

  const newFilters = generateFilters(tasks);
  filtersComponent = new FiltersComponent(newFilters);
  render(mainNode, filtersComponent.getElement(), Position.AFTER_END);
  setCheckFilter(currentFilter);
  addListenersToFilters(filtersComponent, tasks, boardComponent);
};


/**
 * Добавление лисенеров на фильтры
 * @param {Object} filtersComponent фильтры
 * @param {Array} tasks задачи
 * @param {Object} boardComponent доска задач
 */
const addListenersToFilters = (filtersComponent, tasks, boardComponent) => {

  const boardFilters = Array.from(filtersComponent.getElement().querySelectorAll(FILTER_LABEL));

  const filterClickHandler = (evt) => {
    unCheckFilter();

    const filter = evt.target.closest(FILTER_LABEL);
    const filterAttribute = filter.getAttribute(`for`);
    const filteringTasks = getFilteringTasks(tasks, filterAttribute);

    setCheckFilter(filterAttribute);
    reRenderBoard(filteringTasks, boardComponent, filterAttribute);
  };

  const addListenerForFilter = () => (boardFilter) => boardFilter.addEventListener(`click`, filterClickHandler);

  boardFilters.map(addListenerForFilter(tasks));
};


/**
 * Фильтрация задач в соответствии с выбранным фильтром
 * @param {Array} tasks задачи
 * @param {string} attributeFor выбираемый фильтр
 * @return {Array} отфильтрованный массив задач
 */
const getFilteringTasks = (tasks, attributeFor = `filter__all`) => {
  let tasksNotArchive = [];
  if (tasks.length) {
    tasksNotArchive = tasks.filter((task) => !task.isArchive);
  }

  switch (attributeFor) {
    case `filter__all`:
      return tasksNotArchive;
    case `filter__overdue`:
      return tasksNotArchive.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now());
    case `filter__today`:
      return tasksNotArchive.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate());
    case `filter__favorites`:
      return tasksNotArchive.filter((task) => task.isFavorite);
    case `filter__repeating`:
      return tasksNotArchive.filter((task) => Object.values(task.repeatingDays).some(Boolean));
    case `filter__archive`:
      return tasks.filter((task) => task.isArchive);
    default:
      return 0;
  }
};


/**
 * Получение идентификатора фильтра с состоянием "checked"
 * @return {string}
 */
const getCheckedFilter = () => document.querySelector(`input:checked`).getAttribute(`id`);


/**
 * Удаление с фильтра состояния "checked"
 */
const unCheckFilter = () => {
  const checkedFilter = document.querySelector(`input:checked`);
  checkedFilter.removeAttribute(`checked`);
};


/**
 * Уставновка фильтра в состояние "checked"
 * @param {string} filterAttribute
 */
const setCheckFilter = (filterAttribute) => {
  const input = document.querySelector(`#${filterAttribute}`);
  input.setAttribute(`checked`, true);
};


export {addListenersToFilters, regenerateFilters, getFilteringTasks, getCheckedFilter, setCheckFilter};
