/**
 * Получение секции фильтров
 * @param {*} filters разметка фильтров
 * @return {string} разметка секции
 */
export const createFilterSection = (filters) => {
  return (`
    <section class="main__filter filter container">
      ${filters}
    </section>
  `);
};
