import {generateFilters} from "../mock/filters";

/**
 * Создание шаблона для блока фильтров
 * @param {*} name наименование фильтра
 * @param {*} count количество задач, соответствующее фильтру
 * @return {string} фильтр
 */

const createFilterMarkup = (name, count) => {
  return (`
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>
  `);
};

/**
 * Создание шаблона перечня фильтров
 * @param {*} filters объект с фильтрами
 * @return {string} перечень фильтров для разметки
 */
export const createFilter = () => {
  const filterMarkup = generateFilters().map((it) => createFilterMarkup(it.name, it.count)).join(`\n`);
  return (`
    <section class="main__filter filter container">
      ${filterMarkup}
    </section>
  `);
};
