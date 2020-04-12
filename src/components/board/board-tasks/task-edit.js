import {createColorBar} from "./common/color-bar";
import {createDescription} from "./common/description";
import {createSettingsBlock} from "./common/settings";
import {createButtonsBlock} from "./common/buttons";

/**
 * Создание разметки для формы просмотра задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} classesMarkup классы разметки
 * @param {Object} taskParameters дополнительные параметры задачи
 * @return {string} разметка формы просмотра задачи
 */
const getEditForm = (task, isView, classesMarkup, taskParameters) => {
  const {description, color} = task;
  const {repeatClass, deadlineClass} = classesMarkup;
  const {isRepeating} = taskParameters;

  return (`
    <article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          ${createColorBar()}
          ${createDescription(description, isView)}
          ${createSettingsBlock(task, isView, isRepeating)}
          ${createButtonsBlock(task, isView)}
        </div>
      </form>
    </article>
  `);
};

export {getEditForm};
