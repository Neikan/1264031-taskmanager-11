import TaskComponent from "../../task";
import {Form, KeyCode} from "../../../consts.js";
import {render} from "../../../utils.js";

/**
 * Изменение формы редактирования задачи на форму просмотра
 * @param {Object} tasksList список задач
 * @param {Object} {формы задачи}
 */
const changeFormToView = (tasksList, {view, edit}) => {
  const editForm = edit.getElement().querySelector(`form`);

  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    tasksList.replaceChild(view.getElement(), edit.getElement());
  };

  editForm.addEventListener(`submit`, editFormSubmitHandler);
};

/**
 * Изменение формы просмотра задачи на форму редактирования
 * @param {Object} tasksList список задач
 * @param {Object} {формы задачи}
 * @param {Function} escKeyDownHandler помощник
 */
const changeFormToEdit = (tasksList, {view, edit}, escKeyDownHandler) => {
  const editBtn = view.getElement().querySelector(`.card__btn--edit`);

  const editBtnClickHandler = () => {
    tasksList.replaceChild(edit.getElement(), view.getElement());
    document.addEventListener(`keydown`, escKeyDownHandler);
  };

  editBtn.addEventListener(`click`, editBtnClickHandler);
};

/**
 * Реализация помощника для изменение формы редактирования задачи
 * на форму просмотра при нажатии на клавишу Escape
 * @param {Object} tasksList список задач
 * @param {Object} {формы задачи}
 * @return {Function} помощник
 */
const escKeyDownHandler = (tasksList, {view, edit}) => {
  const handler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      tasksList.replaceChild(view.getElement(), edit.getElement());
      document.removeEventListener(`keydown`, handler);
    }
  };
  return handler;
};

/**
 * Отрисовка задачи в блок списка задач
 * @param {Object} tasksList список задач
 * @param {Object} task задача
 */
const renderTask = (tasksList, task) => {
  const taskForm = {
    view: new TaskComponent(task),
    edit: new TaskComponent(task, Form.EDIT)
  };

  changeFormToView(tasksList, taskForm);
  changeFormToEdit(tasksList, taskForm, escKeyDownHandler(tasksList, taskForm));
  render(tasksList, taskForm.view.getElement());
};

export {renderTask};
