import {CHECKED} from "../consts";
import {generateFilters} from "../mock/filters/filters";

/**
 * Создание разметки для перечня фильтров
 * @return {string} разметка блока
 */
const createFilters = () => createFiltersSection(generateFilters().map(getFilter).join(`\n`));

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
  return (`
    <section class="main__filter filter container">
      ${filters}
    </section>
  `);
};

/**
 * Создание разметки фильтра
 * @param {Object} filter фильтр
 * @param {boolean} isChecked флаг, показывающий что фильтр выбран
 * @return {string} разметка фильтра
 */
const createFilter = ({name, checked, count}) => {
  return (`
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked && CHECKED}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>
  `);
};

export {createFilters};
