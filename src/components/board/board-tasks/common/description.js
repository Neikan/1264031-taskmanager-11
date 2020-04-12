import {getViewDescription} from "./description/description-view";
import {getEditDescription} from "./description/description-edit";

/**
 * Создание разметки блока с описанием задачи
 * @param {string} description описание задачи
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} разметка блока
 */
const createDescription = (description, isView) => {
  return isView ? getViewDescription(description) : getEditDescription(description);
};

export {createDescription};
