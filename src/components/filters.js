import {generateFilters} from "../mock/filters/filters";

/**
 * Создание разметки для перечня фильтров
 * @return {string} разметка перечня фильтров
 */
const createFilters = () => createFilterSection(generateFilters()
    .map((it, i) => createFilter(it, i === 0))
    .join(`\n`));


/**
 * Получение блока фильтров
 * @param {string} filters разметка фильтров
 * @return {string} разметка блока
 */
const createFilterSection = (filters) => {
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
const createFilter = (filter, isChecked) => {
  const {name, count} = filter;
  return (`
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>
  `);
};

export {createFilters};
