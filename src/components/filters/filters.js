import {Checked} from "../../consts";
import {createElement} from "../../utils";

/**
 * Создание разметки для перечня фильтров
 * @param {Array} filters
 * @return {string} разметка блока
 */
const createFilters = (filters) => createFiltersSection(filters.map(getFilter).join(`\n`));

/**
 * Получение разметки для каждого фильтра
 * @param {Object} filter
 * @return {string} разметка фильтра
 */
const getFilter = (filter) => createFilter(filter);

/**
 * Создание разметки блока фильтров
 * @param {string} filters разметка фильтров
 * @return {string} разметка блока
 */
const createFiltersSection = (filters) => {
  return (
    `<section class="main__filter filter container">
      ${filters}
    </section>`
  );
};

/**
 * Создание разметки блока фильтра
 * @param {Object} {параметры фильтра}
 * @return {string} разметка блока
 */
const createFilter = ({name, checked, count}) => {
  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked && Checked.INPUT}/>
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>`
  );
};

/**
 * Создание класса фильтров
 */
export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilters(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
