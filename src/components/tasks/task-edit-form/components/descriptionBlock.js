/**
 * Создание разметки блока с описанием задачи
 * @param {*} description описание задачи
 * @return {string} разметка блока с описанием задачи
 */
export const createDescription = (description) => {
  return (`
    <div class="card__textarea-wrap">
      <label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="text"
        >${description}</textarea>
      </label>
    </div>
  `);
};
