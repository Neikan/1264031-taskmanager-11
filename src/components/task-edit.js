import {Form, ButtonTask} from "../consts";
import AbstractSmartComponent from "./abstract/abstract-smart-component";
import {createTask} from "./task/task-creation";
import {checkIsRepeating} from "../utils/common";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const Selector = {
  REPEAT_DAYS: `.card__repeat-days`,
  REPEAT_TOGGLE: `.card__repeat-toggle`,
  DEADLINE_TOGGLE: `.card__date-deadline-toggle`,
  CORORS_WRAP: `.card__colors-wrap`
};


/**
 * Создание класса задачи
 */
class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = checkIsRepeating(task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._activeColor = task.color;
    this._submitHandler = null;
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createTask(
        this._task,
        Form.EDIT,
        this._getParameters()
    );
  }


  /**
   * Метод, обеспечивающий восставновление слушателей
   */
  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }


  /**
   * Метод, обеспечивающий перерисовку карточки
   */
  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }


  /**
   * Метод, обспечивающий добавление помощника на отправку формы
   * @param {Function} handler
   */
  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }


  /**
   * Метод, обспечивающий добавление помощника на кнопку удаления задачи
   * @param {Function} handler
   */
  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.${ButtonTask.DELETE}`)
      .addEventListener(`click`, handler);
  }


  /**
   * Метод, обеспечивабщий сбор изменяемых параметров задачи в едином объекте
   * @return {Object}
   */
  _getParameters() {
    return {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
      activeColor: this._activeColor
    };
  }


  /**
   * Метод, добавляющий возможность выбора даты из календаря
   */
  _applyFlatpickr() {
    this._resetFlatpickr();
    this._changeDateInputToFlatpickr();
  }


  /**
   * Метод, обеспечивающий сброс внесенных изменений
   */
  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = checkIsRepeating(task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._activeColor = task.color;

    this.rerender();
  }


  /**
   * Метод, обеспечивающий подписку на события на карточке
   */
  _subscribeOnEvents() {
    const element = this.getElement();

    this._changeDeadline(element);
    this._changeRepeatability(element);
    this._changeRepeatingDays(element);
    this._changeColor(element);
  }


  /**
   * Метод, обеспечивающий установку срока исполнения задачи
   * @param {Object} element
   */
  _changeDeadline(element) {
    element.querySelector(Selector.DEADLINE_TOGGLE)
      .addEventListener(`click`, this._changeDeadlineHandler());
  }


  /**
   * Метод, обеспечивающий установку признака повторения задачи
   * @param {Object} element
   */
  _changeRepeatability(element) {
    element.querySelector(Selector.REPEAT_TOGGLE)
      .addEventListener(`click`, this._changeRepeatabilityHandler());
  }


  /**
   * Метод, обеспечивающий изменение дней повторения задачи
   * @param {Object} element
   */
  _changeRepeatingDays(element) {
    const repeatDays = element.querySelector(Selector.REPEAT_DAYS);

    if (repeatDays) {
      repeatDays.addEventListener(`change`, this._changeRepeatingDaysHandler());
    }
  }


  /**
   * Метод, обеспечивающий изменение цвета
   * @param {Object} element
   */
  _changeColor(element) {
    const color = element.querySelector(Selector.CORORS_WRAP);

    if (color) {
      color.addEventListener(`change`, this._changeColorHandler());
    }
  }


  /**
   * Метод, обеспечивающий пересоздание _flatpickr
   */
  _resetFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
  }


  /**
   * Метод, обеспечивающий подмену поля ввода даты
   */
  _changeDateInputToFlatpickr() {
    if (this._isDateShowing) {
      this._flatpickr = flatpickr(
          this.getElement().querySelector(`.card__date`), this._createrFlatpickr()
      );
    }
  }


  /**
   * Метод, обеспечивающий создание поля ввода flatpickr с заданными параметрами
   * @return {Object}
   */
  _createrFlatpickr() {
    return {
      altInput: true,
      allowInput: true,
      defaultDate: this._task.dueDate || `today`,
    };
  }


  /**
   * Метод, создающий помощника для установки срока исполнения задачи
   * @return {Function} созданный помощник
   */
  _changeDeadlineHandler() {
    return () => {
      this._isDateShowing = !this._isDateShowing;
      this.rerender();
    };
  }


  /**
   * Метод, создающий помощника для установки признака повторения задачи
   * @return {Function} созданный помощник
   */
  _changeRepeatabilityHandler() {
    return () => {
      this._isRepeatingTask = !this._isRepeatingTask;
      this.rerender();
    };
  }


  /**
   * Метод, создающий помощника для отслеживания изменения дней повторения
   * @return {Function} созданный помощник
   */
  _changeRepeatingDaysHandler() {
    return (evt) => {
      this._activeRepeatingDays[evt.target.value] = evt.target.checked;
      this.rerender();
    };
  }


  /**
   * Метод, создающий помощника для отслеживания изменения цвета
   * @return {Function} созданный помощник
   */
  _changeColorHandler() {
    return (evt) => {
      this._activeColor = evt.target.value;
      this.rerender();
    };
  }
}


export {TaskEdit};
