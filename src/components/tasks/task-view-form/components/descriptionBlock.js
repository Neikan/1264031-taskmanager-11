/**
 * Создание разметки блока с описанием задачи
 * @param {string} description описание задачи
 * @return {string} разметка блока с описанием задачи
 */
export const createDescription = (description) => {
  return (`
    <div class="card__textarea-wrap">
      <p class="card__text">${description}</p>
    </div>
  `);
};
