import {createButtonsBlock} from "./common/buttons";
import {createColorBar} from "./common/color-bar";
import {createDescription} from "./common/description";
import {createSettingsBlock} from "./common/settings";

/**
 * Создание разметки блока формы просмотра задачи
 * @param {Object} task задача
 * @param {Object} classes классы разметки
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} options
 * @return {string} разметка блока
 */
const getViewForm = (task, classes, isView) => {
  const {description, color} = task;
  const {repeat, deadline} = classes;

  return (
    `<article class="card card--${color} ${repeat} ${deadline}">
      <div class="card__form">
        <div class="card__inner">
          ${createButtonsBlock(task, isView)}
          ${createColorBar()}
          ${createDescription(description, isView)}
          ${createSettingsBlock(task, isView)}
        </div>
      </div>
    </article>`
  );
};

export {getViewForm};
