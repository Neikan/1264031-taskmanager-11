import {createButtonsBlock} from "./common/buttonsBlock";
import {createColorBar} from "./common/colorBarBlock";
import {createDescription} from "./common/descriptionBlock";
import {createSettingsBlock} from "./common/settingsBlock";

/**
 * Создание разметки для формы просмотра задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} classesMarkup классы разметки
 * @return {string} разметка формы просмотра задачи
 */
export const getViewForm = (task, isView, classesMarkup) => {
  const {description, color} = task;
  const {repeatClass, deadlineClass} = classesMarkup;

  return (`
    <article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          ${createButtonsBlock(task, isView)}
          ${createColorBar()}
          ${createDescription(description, isView)}
          ${createSettingsBlock(task, isView)}
        </div>
      </div>
    </article>
  `);
};
