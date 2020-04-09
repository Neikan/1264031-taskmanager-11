import {createButtonsBlock} from "./components/common/buttonsBlock";
import {createColorBar} from "./components/common/colorBarBlock";
import {createSettingsBlock} from "./components/common/settingsBlock";
import {createDescription} from "./components/common/descriptionBlock";

/**
 * Создание шаблона отображения существующей карточки задачи
 * @param {Object} task задача
 * @param {Object} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} форма просмотра задачи
 */
export const createTask = (task, isView) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  // const TaskParameters = {
  //   isExpired: dueDate instanceof Date && dueDate < Date.now(),
  //   isRepeatingTask: Object.values(repeatingDays).some(Boolean)
  // };

  // const Flags = {
  //   repeatClass: TaskParameters.isRepeatingTask ? `card--repeat` : ``,
  //   deadlineClass: TaskParameters.isExpired ? `card--deadline` : ``
  // };
  if (isView) {
    return (`
      <article class="card card--${color} ${repeatClass} ${deadlineClass}">
        <div class="card__form">
          <div class="card__inner">
            ${createButtonsBlock(isView, task)}
            ${createColorBar()}
            ${createDescription(description, isView)}
            ${createSettingsBlock(isView, task)}
          </div>
        </div>
      </article>
    `);
  } else {
    return (`
    <article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          ${createColorBar()}
          ${createDescription(description, isView)}
          ${createSettingsBlock(isView, task, isRepeatingTask)}
          ${createButtonsBlock(isView, task)}
        </div>
      </form>
    </article>
  `);
  }
};
