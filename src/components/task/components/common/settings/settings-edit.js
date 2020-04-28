import {createDateBlock} from "./../../task-edit/date-block";
import {createRepeatBlock} from "./../../task-edit/repeat-block";
import {createColorsBlock} from "./../../task-edit/colors-block";


/**
 * Создание разметки блока с описанием задачи для создания / редактирования
 * @param {string} task описание задачи
 * @param {string} date дата
 * @param {string} time время
 * @param {Boolean} isDateShowing флаг, определяющий имеет ли задача срок исполнения
 * @param {Object} options параметры формы редактирования задачи
 * @return {string} разметка блока
 */
const getEditSettings = (task, date, time, isDateShowing, options) => {
  const {color} = task;

  return (
    `<div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          ${createDateBlock(isDateShowing, date, time)}
          ${createRepeatBlock(options)}
        </div>
      </div>
      ${createColorsBlock(color)}
    </div>`
  );
};


export {getEditSettings};
