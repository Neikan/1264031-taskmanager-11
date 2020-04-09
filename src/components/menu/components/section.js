/**
 * Создание разметки меню
 * @param {*} menuItems пункты меню
 * @return {string} разметка меню
 */
export const createMenuSection = (menuItems) => {
  return (`
    <section class="control__btn-wrap">
      ${menuItems}
    </section>
  `);
};
