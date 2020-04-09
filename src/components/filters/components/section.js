/**
 * Получение блока фильтров
 * @param {string} filters разметка фильтров
 * @return {string} разметка блока
 */
export const createFilterSection = (filters) => {
  return (`
    <section class="main__filter filter container">
      ${filters}
    </section>
  `);
};
