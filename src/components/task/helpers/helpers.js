import TaskComponent from "../task";
import {Form, KeyCode} from "../../../consts.js";
import {render} from "../../../utils.js";
import {replaceBoard} from "../../board/helpers/helpers";

let countDeletedTasks = 0;

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
 * Добавление задачи в архив
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} {формы задачи}
 * @param {Array} tasks массив задач
 */
const addToArchive = (boardComponent, tasksList, {view}, tasks) => {
  const archiveBtn = view.getElement().querySelector(`.card__btn--archive`);
  if (!archiveBtn.classList.contains(`card__btn--disabled`)) {
    const archiveBtnClickHandler = () => {
      archiveBtn.classList.add(`card__btn--disabled`);
      archiveBtn.removeEventListener(`click`, archiveBtnClickHandler);

      checktArchiveTasks(boardComponent, tasks);
    };

    archiveBtn.addEventListener(`click`, archiveBtnClickHandler);
  }
};

/**
 * Реализация помощника для удаления задачи с доски
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} {формы задачи}
 * @param {Array} tasks массив задач
 * @param {Number} showingTasksCount количество отображаемых задач на доске
 * @param {Function} escKeyDownHandler помощник
 * @return {Function} реализованный помощник
 */
const getDeleteBtnClickHandler = (
    boardComponent,
    tasksList,
    {edit},
    tasks,
    showingTasksCount,
    escKeyDownHandler) => {
  return () => {
    edit.getElement().remove();
    document.removeEventListener(`keydown`, escKeyDownHandler);
    countDeletedTasks += 1;
    if (showingTasksCount + countDeletedTasks < tasks.length) {
      const newTask = tasks[showingTasksCount + countDeletedTasks];
      renderTask(boardComponent, tasks, showingTasksCount, newTask);
    }
    if (tasksList.querySelectorAll(`.card`).length < showingTasksCount
      && boardComponent.getElement().querySelector(`.load-more`)) {
      boardComponent.getElement().querySelector(`.load-more`).remove();
    }
    if (!tasksList.querySelectorAll(`.card`).length) {
      replaceBoard(boardComponent);
    }
  };
};

/**
 * Удаление задачи с доски
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} {формы задачи}
 * @param {Array} tasks массив задач
 * @param {Number} showingTasksCount количество отображаемых задач на доске
 * @param {Function} escKeyDownHandler помощник
 */
const deleteTask = (boardComponent, tasksList, {edit}, tasks, showingTasksCount, escKeyDownHandler) => {
  const deleteBtn = edit.getElement().querySelector(`.card__delete`);

  const deleteBtnClickHandler = getDeleteBtnClickHandler(
      boardComponent, tasksList, {edit}, tasks, showingTasksCount, escKeyDownHandler);

  deleteBtn.addEventListener(`click`, deleteBtnClickHandler);
};

/**
 * Отрисовка задачи в блок списка задач
 * @param {Object} boardComponent список задач
 * @param {Array} tasks массив задач
 * @param {Number} showingTasksCount
 * @param {Object} task задача
 */
const renderTask = (boardComponent, tasks, showingTasksCount, task) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  const taskForm = {
    view: new TaskComponent(task),
    edit: new TaskComponent(task, Form.EDIT)
  };

  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      tasksList.replaceChild(taskForm.view.getElement(), taskForm.edit.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  changeFormToView(tasksList, taskForm);
  changeFormToEdit(tasksList, taskForm, escKeyDownHandler);
  deleteTask(boardComponent, tasksList, taskForm, tasks, showingTasksCount, escKeyDownHandler);
  addToArchive(boardComponent, tasksList, taskForm, tasks);

  render(tasksList, taskForm.view.getElement());
};

export {renderTask, checktArchiveTasks};

const checktArchiveTasks = (boardComponent, tasks) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  const countArchiveTasks = tasksList.querySelectorAll(`.card__btn--archive.card__btn--disabled`);
  if ((tasks.length - countArchiveTasks.length) === 0) {
    replaceBoard(boardComponent);
  }
};
