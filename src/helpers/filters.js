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
 */
const regenerateFilters = (filtersComponent, tasks, boardComponent) => {
  document.querySelector(`.filter.container`).remove();
  const mainNode = document.querySelector(`.main__control`);

  const newFilters = generateFilters(tasks);
  filtersComponent = new FiltersComponent(newFilters);
  render(mainNode, filtersComponent.getElement(), Position.AFTER_END);
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
    const filter = evt.target.closest(FILTER_LABEL);
    const attributeFor = filter.getAttribute(`for`);
    const filteringTasks = getFilteringTasks(tasks, attributeFor);
    reRenderBoard(filteringTasks, boardComponent, attributeFor);
    console.log(filteringTasks);
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


// const getDefaultFilter = () => {};
// здесь будет выбранный по умолчанию фильтр


export {addListenersToFilters, regenerateFilters, getFilteringTasks};
