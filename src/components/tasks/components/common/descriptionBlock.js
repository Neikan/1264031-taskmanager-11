/**
 * Создание разметки блока с описанием задачи
 * @param {string} description описание задачи
 * @param {Boolean} isView
 * @return {string} разметка блока с описанием задачи
 */
export const createDescription = (description, isView) => {
  if (isView) {
    return (`
    <div class="card__textarea-wrap">
      <p class="card__text">${description}</p>
    </div>
  `);
  } else {
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
  }
};
