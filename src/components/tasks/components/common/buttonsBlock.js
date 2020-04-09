import {getViewButtons} from "./components/buttonsView";
import {getEditButtons} from "./components/buttonsEdit";

/**
 * Создание разметки блока кнопок задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока кнопок задачи
 */
export const createButtonsBlock = (task, isView) => {
  const {isArchive, isFavorite} = task;

  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;

  return isView ? getViewButtons(archiveButtonInactiveClass, favoriteButtonInactiveClass) : getEditButtons();
};
