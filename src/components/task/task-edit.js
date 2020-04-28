import {Form, ButtonTask} from "../../consts";
import AbstractSmartComponent from "../abstract/abstract-smart-component";
import {createTask} from "./components/task-creation";
import {checkIsRepeating} from "../../utils/common";


const Selector = {
  REPEAT_DAYS: `.card__repeat-days`,
  REPEAT_TOGGLE: `.card__repeat-toggle`,
  DEADLINE_TOGGLE: `.card__date-deadline-toggle`,
  CORORS_WRAP: `.card__colors-wrap`
};


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
    this._activeColor = task.color;
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
          activeColor: this._activeColor
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


  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._activeColor = task.color;

    this.rerender();
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

    changeDeadline(this, element);
    changeRepeatability(this, element);
    changeRepeatingDays(this, element);
    changeColor(this, element);
  }
}


/**
 * Функция, обеспечивающая установку срока исполнения задачи
 * @param {Object} taskEdit
 * @param {Object} element
 */
const changeDeadline = (taskEdit, element) => {
  element.querySelector(Selector.DEADLINE_TOGGLE)
    .addEventListener(`click`, () => {
      taskEdit._isDateShowing = !taskEdit._isDateShowing;
      taskEdit.rerender();
    });
};


/**
 * Функция, обеспечивающая установку дней повторения задачи
 * @param {Object} taskEdit
 * @param {Object} element
 */
const changeRepeatability = (taskEdit, element) => {
  element.querySelector(Selector.REPEAT_TOGGLE)
    .addEventListener(`click`, () => {
      taskEdit._isRepeatingTask = !taskEdit._isRepeatingTask;
      taskEdit.rerender();
    });
};


/**
 * Функция, обеспечивающая изменение дней повторения задачи
 * @param {Object} taskEdit
 * @param {Object} element
 */
const changeRepeatingDays = (taskEdit, element) => {
  const repeatDays = element.querySelector(Selector.REPEAT_DAYS);
  if (repeatDays) {
    repeatDays.addEventListener(`change`, (evt) => {
      taskEdit._activeRepeatingDays[evt.target.value] = evt.target.checked;
      taskEdit.rerender();
    });
  }
};


/**
 * Функция, обеспечивающая изменение цвета
 * @param {Object} taskEdit
 * @param {Object} element
 */
const changeColor = (taskEdit, element) => {
  const color = element.querySelector(Selector.CORORS_WRAP);
  if (color) {
    color.addEventListener(`change`, (evt) => {
      taskEdit._activeColor = evt.target.value;

      taskEdit.rerender();
    });
  }
};
