import TaskComponent from "../components/task/task.js";
import {render, replace} from "../utils/change-component";
import {Form, KeyCode} from "../consts.js";


/**
 * Получение форм задачи
 * @param {Object} taskData данные задачи
 * @return {Object} формы задачи
 */
const getTaskForm = (taskData) => {
  return {
    view: new TaskComponent(taskData),
    edit: new TaskComponent(taskData, Form.EDIT)
  };
};


export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskForm = null;

    this.escKeyDownHandler = this.escKeyDownHandler.bind(this);
  }

  render(task) {
    this._taskForm = getTaskForm(task);

    this._taskForm.view.setEditBtnClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this.escKeyDownHandler);
    });

    this._taskForm.edit.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    render(this._container, this._taskForm.view);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this.escKeyDownHandler);
    replace(this._taskForm.view, this._taskForm.edit);
  }

  _replaceTaskToEdit() {
    replace(this._taskForm.edit, this._taskForm.view);
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}
