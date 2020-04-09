import {MONTH_NAMES} from "../../consts";
import {formatTime} from "../../utils";
import {createButtonsBlock} from "./components/buttonsBlock";
import {createColorBar} from "../common/colorBarBlock";
import { createSettingsBlock } from "./components/settingsBlock";
import { tasks } from "../../board/components/tasksBlock";
import { createDescription } from "./components/descriptionBlock";

/**
 * Создание шаблона отображения существующей карточки задачи
 * @param {Object} task задача для отрисовки
 * @return {string} карточка задачи
 */
export const createTask = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (`
    <article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          ${createButtonsBlock(task)}
          ${createColorBar()}
          ${createDescription(description)}
          ${createSettingsBlock(task)}
        </div>
      </div>
    </article>
  `);
};
