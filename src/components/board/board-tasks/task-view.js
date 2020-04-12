import {createButtonsBlock} from "./common/buttons";
import {createColorBar} from "./common/color-bar";
import {createDescription} from "./common/description";
import {createSettingsBlock} from "./common/settings";

/**
 * Создание разметки для формы просмотра задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} classesMarkup классы разметки
 * @return {string} разметка формы просмотра задачи
 */
const getViewForm = (task, isView, classesMarkup) => {
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

export {getViewForm};
