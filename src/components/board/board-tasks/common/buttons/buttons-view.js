/**
 * Создание разметки кнопок формы просмотра задачи
 * @param {string} archiveInactive класс неактивной кнопки добавления в "Архив"
 * @param {string} favoriteInactive класс неактивной кнопки добавления в "Избранное"
 * @return {string} разметка кнопок формы просмотра задачи
 */
const getViewButtons = (archiveInactive, favoriteInactive) => {
  return (`
    <div class="card__control">
      <button type="button" class="card__btn card__btn--edit">
        edit
      </button>

      <button type="button" class="card__btn card__btn--archive ${archiveInactive}">
        archive
      </button>

      <button
        type="button"
        class="card__btn card__btn--favorites ${favoriteInactive}"
      >
        favorites
      </button>
    </div>
  `);
};

export {getViewButtons};
