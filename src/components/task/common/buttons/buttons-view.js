import {ButtonTask, PART_BTN_CLASS} from "../../../../consts";


/**
 * Создание разметки кнопки
 * @param {string} name название кнопки
 * @param {string} inactiveBtn признак доступности кнопки
 * @return {string} разметка кнопки
 */
const createButton = (name, inactiveBtn) => {
  return (
    `<button
      type="button"
      class="card__btn ${PART_BTN_CLASS}${name} ${inactiveBtn}"
    >
      ${name}
    </button>`
  );
};


/**
 * Создание разметки блока кнопок формы просмотра задачи
 * @param {string} archiveInactive класс неактивной кнопки добавления в "Архив"
 * @param {string} favoriteInactive класс неактивной кнопки добавления в "Избранное"
 * @return {string} разметка блока
 */
const getViewButtons = (archiveInactive, favoriteInactive) => {
  return (
    `<div class="card__control">
      ${createButton(ButtonTask.EDIT)}
      ${createButton(ButtonTask.ARCHIVE, archiveInactive)}
      ${createButton(ButtonTask.FAVORITE, favoriteInactive)}
    </div>`
  );
};

export {getViewButtons};
