import TaskComponent from "../components/task/task";
import {Form, KeyCode, IsArchive} from "../consts.js";
import {render} from "../utils.js";
import {reRenderBoard} from "./board";
// import {reRenderBoard, reRenderBoardWithEditTask, renderBoard} from "./board";
import {regenerateFilters, getCheckedFilter} from "./filters";


// let countDeletedTasks = 0;

// /**
//  * Изменение формы редактирования задачи на форму просмотра
//  * @param {Object} tasksList список задач
//  * @param {Object} {формы задачи}
//  */
// const changeFormToView = (tasksList, {view, edit}) => {
//   const editForm = edit.getElement().querySelector(`form`);

//   const editFormSubmitHandler = (evt) => {
//     evt.preventDefault();
//     tasksList.replaceChild(view.getElement(), edit.getElement());
//   };

//   editForm.addEventListener(`submit`, editFormSubmitHandler);
// };


/**
 * Изменение формы просмотра задачи на форму редактирования
 * @param {Object} filtersComponent
 * @param {Object} boardComponent
 * @param {Object} tasksList список задач
 * @param {Object} {формы задачи}
 * @param {Function} escKeyDownHandler помощник
 * @param {Array} tasks задачи
 * @param {Number} taskIndex индекс ранее открытой задачи
 */
// const changeFormToEdit = (filtersComponent, boardComponent, tasksList, {view, edit}, escKeyDownHandler, tasks) => {
//   const editBtn = view.getElement().querySelector(`.card__btn--edit`);

//   const editBtnClickHandler = () => {
//     if (tasksList.querySelector(`.card--edit`)) {
//       replaceBoard(filtersComponent, boardComponent, tasks);
//     }

//     tasksList.replaceChild(edit.getElement(), view.getElement());
//     document.addEventListener(`keydown`, escKeyDownHandler);
//   };

//   editBtn.addEventListener(`click`, editBtnClickHandler);
// };


/**
 * Добавление задачи в архив
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Object} view форма просмотра задачи
 * @param {Array} tasks массив задач
 * @param {Number} taskIndex индекс задачи
 */
// const addTaskToArchive = (filtersComponent, boardComponent, {view}, tasks, taskIndex) => {
//   const archiveBtn = view.getElement().querySelector(`.card__btn--archive`);
//   if (!archiveBtn.classList.contains(`card__btn--disabled`)) {

//     const archiveBtnClickHandler = () => {
//       archiveBtn.classList.add(`card__btn--disabled`);
//       tasks[taskIndex].isArchive = IsArchive.YES;

//       regenerateFilters(filtersComponent, tasks);

//       archiveBtn.removeEventListener(`click`, archiveBtnClickHandler);
//       checktArchiveTasks(filtersComponent, boardComponent, tasks);
//     };

//     archiveBtn.addEventListener(`click`, archiveBtnClickHandler);
//   }
// };


/**
 * Реализация помощника для удаления задачи с доски
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} {формы задачи}
 * @param {Number} taskIndex индекс текущей задачи
 * @param {Array} tasks массив задач
 * @param {Number} showingTasksCount количество отображаемых задач на доске
 * @param {Function} escKeyDownHandler помощник
 * @return {Function} реализованный помощник
 */
// const getDeleteBtnClickHandler = (
//     filtersComponent,
//     boardComponent,
//     tasksList,
//     {edit},
//     taskIndex,
//     tasks,
//     showingTasksCount,
//     escKeyDownHandler) => {
//   return () => {
//     edit.getElement().remove();
//     edit.removeElement();
//     document.removeEventListener(`keydown`, escKeyDownHandler);
//     // countDeletedTasks++;
//     const newTaskIndex = showingTasksCount + 1;

//     if (newTaskIndex < tasks.length) {
//       const newTask = tasks[newTaskIndex];
//       renderTask(filtersComponent, boardComponent, tasks, showingTasksCount, newTask);
//     }

//     tasks.splice(taskIndex, 1);
//     // countDeletedTasks--;
//     regenerateFilters(filtersComponent, tasks);

//     const countCurrentCards = tasksList.querySelectorAll(`.card`);

//     if (countCurrentCards.length < showingTasksCount
//       && boardComponent.getElement().querySelector(`.load-more`)) {
//       boardComponent.getElement().querySelector(`.load-more`).remove();
//     }

//     // if (!countCurrentCards.length) {
//     //   replaceBoard(filtersComponent, boardComponent);
//     // }
//   };
// };


/**
 * Удаление задачи с доски
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Object} tasksList задачи
 * @param {Object} edit форма редактирования задачи
 * @param {Number} taskIndex индекс задачи
 * @param {Array} tasks массив задач
 * @param {Number} showingTasksCount количество отображаемых задач на доске
 * @param {Function} escKeyDownHandler помощник
 */
// const deleteTask = (filtersComponent, boardComponent, tasksList, {edit}, taskIndex, tasks, showingTasksCount, escKeyDownHandler) => {
//   const deleteBtn = edit.getElement().querySelector(`.card__delete`);

//   const deleteBtnClickHandler = getDeleteBtnClickHandler(
//       filtersComponent, boardComponent, tasksList, {edit}, taskIndex, tasks, showingTasksCount, escKeyDownHandler);

//   deleteBtn.addEventListener(`click`, deleteBtnClickHandler);
// };


/**
 * Отрисовка задачи в блок списка задач
 * @param {Object} boardComponent список задач
 * @param {Array} tasks массив задач
 * @param {Object} taskData задача
 * @param {Number} taskIndex индекс задачи
 * @param {Boolean} isView выбор формы для рендера задачи
 * @param {Object} filtersComponent фильтры
 */
const renderTask = (boardComponent, tasks, taskData, taskIndex, isView, filtersComponent) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  const taskForm = getTaskForm(taskData);
  console.log(taskIndex);
  // 0

  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      tasksList.replaceChild(taskForm.view.getElement(), taskForm.edit.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  // 1

  const editBtnClickHandler = () => {
    if (tasksList.querySelector(`.card--edit`)) {
      // document.removeEventListener(`keydown`, escKeyDownHandler);

      // const currentRenderedTasks = tasksList.querySelectorAll(`.card`).length;
      // renderBoard(boardComponent, tasks, filtersComponent);
      // // reRenderBoardWithEditTask(tasks, boardComponent, taskIndex, currentRenderedTasks);

      // const newTaskForm = getTaskForm(tasks[taskIndex]);
      // render(tasksList, newTaskForm.edit.getElement());
    } else {
      tasksList.replaceChild(taskForm.edit.getElement(), taskForm.view.getElement());
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const editBtn = taskForm.view.getElement().querySelector(`.card__btn--edit`);
  editBtn.addEventListener(`click`, editBtnClickHandler);

  // 2

  const archiveBtnClickHandler = () => {
    if (!archiveBtn.classList.contains(`card__btn--disabled`)) {
      archiveBtn.classList.add(`card__btn--disabled`);
      tasks[taskIndex].isArchive = IsArchive.YES;
      regenerateFilters(filtersComponent, tasks, boardComponent);
      reRenderBoard(tasks, boardComponent, getCheckedFilter());
    } else {
      archiveBtn.classList.remove(`card__btn--disabled`);
      tasks[taskIndex].isArchive = IsArchive.NO;
      regenerateFilters(filtersComponent, tasks, boardComponent);
    }
  };

  const archiveBtn = taskForm.view.getElement().querySelector(`.card__btn--archive`);
  archiveBtn.addEventListener(`click`, archiveBtnClickHandler);

  // 3

  const deleteBtnClickHandler = () => {
    tasks.splice(taskIndex, 1);
    regenerateFilters(filtersComponent, tasks, boardComponent);
    reRenderBoard(tasks, boardComponent);
  };

  const deleteBtn = taskForm.edit.getElement().querySelector(`.card__delete`);
  deleteBtn.addEventListener(`click`, deleteBtnClickHandler);

  // 4

  // 5

  const choiceRenderingForm = isView ? taskForm.view.getElement() : taskForm.edit.getElement();
  render(tasksList, choiceRenderingForm);
};


const checktArchiveTasks = (boardComponent, tasks) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  const countArchiveTasks = tasksList.querySelectorAll(`.card__btn--archive.card__btn--disabled`);
  if ((tasks.length - countArchiveTasks.length) === 0) {
    reRenderBoard(boardComponent);
  }
};

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


export {renderTask, checktArchiveTasks};
