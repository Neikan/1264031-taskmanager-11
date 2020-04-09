/**
 * Создание разметки фильтра
 * @param {Object} filter фильтр
 * @param {boolean} isChecked флаг, показывающий что фильтр выбран
 * @return {string} разметка фильтра
 */
export const createFilter = (filter, isChecked) => {
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
