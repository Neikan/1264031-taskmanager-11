import {createColorBar} from "./common/color-bar";
import {createDescription} from "./common/description";
import {createSettingsBlock} from "./common/settings";
import {createButtonsBlock} from "./common/buttons";

/**
 * Создание разметки блока формы создания / редактирования задачи
 * @param {Object} task задача
 * @param {Object} classes классы разметки
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @param {Object} options параметры формы редактирования задачи
 * @param {Object} additionalInfo дополнительные параметры задачи
 * @return {string} разметка блока
 */
const getEditForm = (task, classes, isView, options) => {
  const {description, color} = task;
  const {repeat, deadline} = classes;

  return (
    `<article class="card card--edit card--${color} ${repeat} ${deadline}">
      <form class="card__form" method="get">
        <div class="card__inner">
          ${createColorBar()}
          ${createDescription(description, isView)}
          ${createSettingsBlock(task, isView, options)}
          ${createButtonsBlock(task, isView, options)}
        </div>
      </form>
    </article>`
  );
};

export {getEditForm};
