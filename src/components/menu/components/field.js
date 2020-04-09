/**
 * Создание разметки пункта меню
 * @param {Object} item пункт меню
 * @return {string} разметка пункта меню
 */
export const createMenuItem = (item) => {
  const {name, label} = item;

  return (`
    <input
      type="radio"
      name="control"
      id="control__${name}"
      class="control__input visually-hidden"
    />
    <label for="control__${name}" class="control__label control__label--${name}"
      >${label}</label
    >
  `);
};
