import {getViewButtons} from "./buttons/buttons-view";
import {getEditButtons} from "./buttons/buttons-edit";

/**
 * Создание разметки блока кнопок задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока
 */
const createButtonsBlock = (task, isView) => {
  const {isArchive, isFavorite} = task;

  const archiveBtnInactive = isArchive ? `card__btn--disabled` : ``;
  const favoriteBtnInactive = isFavorite ? `card__btn--disabled` : ``;

  return isView ? getViewButtons(archiveBtnInactive, favoriteBtnInactive) : getEditButtons();
};

export {createButtonsBlock};
