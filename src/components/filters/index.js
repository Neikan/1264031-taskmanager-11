import {generateFilters} from "../../mock/filters";

/**
 * Создание шаблона для фильтра
 * @param {Object} filter фильтр
 * @param {boolean} isChecked флаг, показывающий что фильтр выбран
 * @return {string} фильтр для разметки
 */
const createFilterMarkup = (filter, isChecked) => {
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

/**
 * Создание шаблона перечня фильтров
 * @return {string} перечень фильтров для разметки
 */
export const createFilter = () => {
  const filterMarkup = generateFilters().map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (`
    <section class="main__filter filter container">
      ${filterMarkup}
    </section>
  `);
};
