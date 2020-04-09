import {createColorBar} from "./components/colorBarBlock";
import {createDescription} from "./components/descriptionBlock";
import {createSettingsBlock} from "./components/settingsBlock";
import {createButtonsBlock} from "./components/buttonsBlock";


/**
 * Создание шаблона формы редактирования / создания карточки задачи
 * @param {Object} task
 * @return {string} форма редактирования / создания карточки задачи
 */
export const createTaskEdit = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (`
    <article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          ${createColorBar()}
          ${createDescription(description)}
          ${createSettingsBlock(task, isRepeatingTask)}
          ${createButtonsBlock()}
        </div>
      </form>
    </article>
  `);
};
