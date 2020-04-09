export const createButtonsBlock = (isView, task) => {
  const {isArchive, isFavorite} = task;

  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;

  if (isView) {
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
  } else {
    return (`
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  `);
  }
};
