import {Form, ButtonTask, PART_BTN_CLASS} from "../consts";
import AbstractComponent from "./abstract/abstract-component";
import {createTask} from "./task/task-creation";


/**
 * Создание класса задачи
 */
class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTask(this._task, Form.VIEW);
  }

  setEditBtnClickHandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.EDIT}`)
      .addEventListener(`click`, handler);
  }

  setArchiveBtnClickHandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.ARCHIVE}`)
      .addEventListener(`click`, handler);
  }

  setFavoritesBtnClickHandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.FAVORITE}`)
      .addEventListener(`click`, handler);
  }
}


export {Task};
