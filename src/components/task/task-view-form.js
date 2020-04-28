import {Form, ButtonTask, PART_BTN_CLASS} from "../../consts";
import AbstractComponent from "../abstract/abstract-component";
import {createTask} from "./components/task-creation";


/**
 * Создание класса задачи
 */
export default class Task extends AbstractComponent {
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

  setArchiveBtnClickhandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.ARCHIVE}`)
      .addEventListener(`click`, handler);
  }

  setFavoriteBtnClickhandler(handler) {
    this.getElement().querySelector(`.${PART_BTN_CLASS}${ButtonTask.FAVORITE}`)
      .addEventListener(`click`, handler);
  }
}
