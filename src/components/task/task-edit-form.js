import {Form, ButtonTask} from "../../consts";
import AbstractSmartComponent from "../abstract/abstract-smart-component";
import {createTask} from "./components/task-creation";
import {checkIsRepeating} from "../../utils/common";


/**
 * Создание класса задачи
 */
export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = checkIsRepeating(task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._submitHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTask(
        this._task,
        Form.EDIT,
        {
          isDateShowing: this._isDateShowing,
          isRepeatingTask: this._isRepeatingTask,
          activeRepeatingDays: this._activeRepeatingDays,
        }
    );
  }


  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }


  rerender() {
    super.rerender();
  }


  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }


  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.${ButtonTask.DELETE}`)
      .addEventListener(`click`, handler);
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;
        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }
}
