import TaskComponent from "../task";
import {Form, KeyCode} from "../../../consts.js";
import {render} from "../../../utils.js";
import {replaceBoard} from "../../board/helpers/helpers";

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
 * Добавление задачи в архив
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} {формы задачи}
 */
const addToArchive = (boardComponent, tasksList, {view}) => {
  const archiveBtn = view.getElement().querySelector(`.card__btn--archive`);
  if (!archiveBtn.classList.contains(`card__btn--disabled`)) {
    const archiveBtnClickHandler = () => {
      archiveBtn.classList.add(`card__btn--disabled`);
      archiveBtn.removeEventListener(`click`, archiveBtnClickHandler);

      const countArchiveTasks = tasksList.querySelectorAll(`.card__btn--archive.card__btn--disabled`);
      const countAllTasks = tasksList.querySelectorAll(`.card__btn--archive`);

      if ((countAllTasks.length - countArchiveTasks.length) === 0) {
        replaceBoard(boardComponent);
      }
    };

    archiveBtn.addEventListener(`click`, archiveBtnClickHandler);
  }
};

/**
 * Удаление задачи с доски
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} {формы задачи}
 */
const deleteTask = (boardComponent, tasksList, {edit}) => {
  const deleteBtn = edit.getElement().querySelector(`.card__delete`);

  const deleteBtnClickHandler = () => {
    edit.getElement().remove();

    if (tasksList.querySelectorAll(`.card`).length === 0) {
      replaceBoard(boardComponent);
    }
  };

  deleteBtn.addEventListener(`click`, deleteBtnClickHandler);
};

/**
 * Отрисовка задачи в блок списка задач
 * @param {Object} boardComponent список задач
 * @param {Object} task задача
 */
const renderTask = (boardComponent, task) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  const taskForm = {
    view: new TaskComponent(task),
    edit: new TaskComponent(task, Form.EDIT)
  };

  changeFormToView(tasksList, taskForm);
  changeFormToEdit(tasksList, taskForm, escKeyDownHandler(tasksList, taskForm));
  deleteTask(boardComponent, tasksList, taskForm);
  addToArchive(boardComponent, tasksList, taskForm);
  render(tasksList, taskForm.view.getElement());
};

export {renderTask};
