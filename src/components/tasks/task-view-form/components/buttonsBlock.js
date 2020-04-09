export const createButtonsBlock = (task) => {
  const {isArchive, isFavorite} = task;

  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;

  return (`
    <div class="card__control">
      <button type="button" class="card__btn card__btn--edit">
        edit
      </button>

      <button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
        archive
      </button>

      <button
        type="button"
        class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
      >
        favorites
      </button>
    </div>
  `);
};
