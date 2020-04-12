/**
 * Создание разметки блока описания формы создания / редактирования задачи
 * @param {string} description описание задачи
 * @return {string} разметка блока
 */
const getViewDescription = (description) => {
  return (`
    <div class="card__textarea-wrap">
      <p class="card__text">${description}</p>
    </div>
  `);
};

export {getViewDescription};
