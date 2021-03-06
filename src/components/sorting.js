import AbstractComponent from "./abstract/abstract-component";
import {SortType} from "../consts";


/**
 * Правила сортировки
 */
const sortRules = {
  'date-down': (showingTasks) => showingTasks.sort((a, b) => a.dueDate - b.dueDate),
  'date-up': (showingTasks) => showingTasks.sort((a, b) => b.dueDate - a.dueDate),
  'default': (showingTasks) => showingTasks,
};


/**
 * Сортировка задач
 * @param {Array} filteredTasks данные задач
 * @param {string} sortType тип сортировки
 * @return {Array} отсортированные данные задач
 */
const getSortedTasks = (filteredTasks, sortType) => sortRules[sortType](filteredTasks.slice());


/**
 * Создание разметки блока сортировки задач
 * @return {string} разметка блока
 */
const createSorting = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};


/**
 * Создание класса сортировки
 */
class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._clickHandler = this._clickHandler.bind(this);
  }


  getTemplate() {
    return createSorting();
  }


  getSortType() {
    return this._currentSortType;
  }


  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._clickHandler(handler));
  }


  _clickHandler(handler) {
    return (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    };
  }
}

export {Sort, getSortedTasks};
