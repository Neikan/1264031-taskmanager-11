import {Position, FilterType, FILTER_LABEL, CountTask} from "../consts";
import {generateFilters} from "../mock/filters/filters";
import {render} from "../utils/change-component";
import {Filters} from "../components/filters";
import {filterRules, getTasksForFilters} from "../utils/common";


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

  filtersComponent = new Filters(generateFilters(allTasks));
  render[Position.AFTER_END](document.querySelector(`.main__control`), filtersComponent);
  setCheckFilter(currentFilter);
  addListenersToFilters(allTasks, filtersComponent, boardController);
};


/**
 * Добавление лисенеров на фильтры
 * @param {Array} tasksModel модель данных задач
 * @param {Object} filtersComponent компонент фильтров
 * @param {Object} boardController контроллер доски задач
 * @param {Number} showingTasksCount количество отображенных задач
 */
const addListenersToFilters = (tasksModel, filtersComponent, boardController) => {

  const boardFilters = Array.from(
      filtersComponent.getElement().querySelectorAll(FILTER_LABEL)
  );

  const filterClickHandler = (evt) => {
    const filterAttribute = evt.target.closest(FILTER_LABEL).getAttribute(`for`);

    unCheckFilter();
    setCheckFilter(filterAttribute);
    tasksModel.setFilter(filterAttribute);
    boardController.rerender(CountTask.START);
  };

  const addListenerForFilter = () => (boardFilter) =>
    boardFilter.addEventListener(`click`, filterClickHandler);

  boardFilters.map(addListenerForFilter(tasksModel.getTasksData()));
};


/**
 * Фильтрация задач в соответствии с выбранным фильтром
 * @param {Array} tasks данные задач
 * @param {string} filter выбираемый фильтр
 * @return {Array} отфильтрованные данные
 */
const getFilteredTasks = (tasks, filter = FilterType.DEFAULT) => {
  const {tasksNotDelete, tasksNotArchive} = getTasksForFilters(tasks);
  const nameFilter = filter.replace(FILTER_MARK, ``);

  return (filter === FilterType.ARCHIVE) ?
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
