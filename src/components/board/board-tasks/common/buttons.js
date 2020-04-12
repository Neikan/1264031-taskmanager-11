import {getViewButtons} from "./buttons/buttons-view";
import {getEditButtons} from "./buttons/buttons-edit";

/**
 * Создание разметки блока кнопок задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока кнопок задачи
 */
const createButtonsBlock = (task, isView) => {
  const {isArchive, isFavorite} = task;

  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;

  return isView ? getViewButtons(archiveButtonInactiveClass, favoriteButtonInactiveClass) : getEditButtons();
};

export {createButtonsBlock};
