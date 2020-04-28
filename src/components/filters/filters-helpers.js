import {Position, FILTER_LABEL, DEFAULT_FILTER} from "../../consts";
import {generateFilters} from "../../mock/filters/filters";
import {render} from "../../utils/change-component";
import FiltersComponent from "./filters";


/**
 * Пересоздание компонента фильтров с обновленными данными задач
 * @param {Array} allTasks данные задач
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardController доска задач
 * @param {string} currentFilter текущий фильтр
 * @param {Number} showingTasksCount количество отображенных задач
 */
const regenerateFilters = (
    allTasks, filtersComponent, boardController, currentFilter
) => {

  document.querySelector(`.filter.container`).remove();

  filtersComponent = new FiltersComponent(generateFilters(allTasks));
  render(document.querySelector(`.main__control`), filtersComponent, Position.AFTER_END);
  setCheckFilter(currentFilter);
  addListenersToFilters(allTasks, filtersComponent, boardController);
};


/**
 * Добавление лисенеров на фильтры
 * @param {Array} allTasks данные задач
 * @param {Object} filtersComponent компонент фильтров
 * @param {Object} boardController контроллер доски задач
 * @param {Number} showingTasksCount количество отображенных задач
 */
const addListenersToFilters = (allTasks, filtersComponent, boardController) => {

  const boardFilters = Array.from(
      filtersComponent.getElement().querySelectorAll(FILTER_LABEL)
  );

  const filterClickHandler = (evt) => {
    const filterAttribute = evt.target.closest(FILTER_LABEL).getAttribute(`for`);

    unCheckFilter();
    setCheckFilter(filterAttribute);
    boardController.rerender(filterAttribute);
  };

  const addListenerForFilter = () => (boardFilter) =>
    boardFilter.addEventListener(`click`, filterClickHandler);

  boardFilters.map(addListenerForFilter(allTasks));
};


/**
 * Фильтрация задач в соответствии с выбранным фильтром
 * @param {Array} tasks данные задач
 * @param {string} attributeFor выбираемый фильтр
 * @return {Array} отфильтрованные данные
 */
const getFilteredTasks = (tasks, attributeFor = DEFAULT_FILTER) => {
  let tasksNotArchive = [];
  const tasksNotDelete = tasks.filter((task) => !task.isDeleted);
  if (tasks.length) {
    tasksNotArchive = tasksNotDelete.filter((task) => !task.isArchive);
  }

  switch (attributeFor) {
    case `filter__all`:
      return tasksNotArchive;

    case `filter__overdue`:
      return tasksNotArchive.filter((task) =>
        task.dueDate instanceof Date && task.dueDate < Date.now());

    case `filter__today`:
      return tasksNotArchive.filter((task) =>
        task.dueDate && task.dueDate.getDate() === new Date().getDate());

    case `filter__favorites`:
      return tasksNotArchive.filter((task) => task.isFavorite);

    case `filter__repeating`:
      return tasksNotArchive.filter((task) =>
        Object.values(task.repeatingDays).some(Boolean));

    case `filter__archive`:
      return tasksNotDelete.filter((task) => task.isArchive);

    default:
      return [];
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


export {addListenersToFilters, regenerateFilters, getFilteredTasks, getCheckedFilter, setCheckFilter};
