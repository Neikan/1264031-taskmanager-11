import {getViewDescription} from "./components/descriptionView";
import {getEditDescription} from "./components/descriptionEdit";

/**
 * Создание разметки блока с описанием задачи
 * @param {string} description описание задачи
 * @param {Boolean} isView
 * @return {string} разметка блока с описанием задачи
 */
export const createDescription = (description, isView) => {
  return isView ? getViewDescription(description) : getEditDescription(description);
};
