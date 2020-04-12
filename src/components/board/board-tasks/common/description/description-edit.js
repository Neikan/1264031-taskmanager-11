/**
  * Создание разметки блока описания формы просмотра задачи
 * @param {string} description описание задачи
 * @return {string} разметка блока с описанием задачи
 */
const getEditDescription = (description) => {
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

export {getEditDescription};
