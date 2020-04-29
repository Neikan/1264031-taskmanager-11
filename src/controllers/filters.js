import {Position, Filter, FILTER_LABEL} from "../consts";
import {generateFilters} from "../mock/filters/filters";
import {render} from "../utils/change-component";
import FiltersComponent from "../components/filters/filters";
import {filterRules, getTasksForFilters} from "../utils/common";

// Здесь будет будущий контроллер фильтров

const FILTER_MARK = `filter__`;

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
  render[Position.AFTER_END](document.querySelector(`.main__control`), filtersComponent);
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
 * @param {string} filter выбираемый фильтр
 * @return {Array} отфильтрованные данные
 */
const getFilteredTasks = (tasks, filter = Filter.DEFAULT) => {
  const {tasksNotDelete, tasksNotArchive} = getTasksForFilters(tasks);
  const nameFilter = filter.replace(FILTER_MARK, ``);

  return (filter === Filter.ARCHIVE) ?
    filterRules[nameFilter](tasksNotDelete) :
    filterRules[nameFilter](tasksNotArchive);
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
