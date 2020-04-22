import TaskComponent from "../components/task/task";
import {Form, KeyCode, IsArchive, IsDeleted} from "../consts.js";
import {render, replace} from "../utils/component-change";
import {reRenderBoard} from "./board";
import {regenerateFilters, getCheckedFilter} from "./filters";


const ButtonClass = {
  DISABLED: `card__btn--disabled`,
  ARCHIVE: `card__btn--archive`
};


/**
 * Отрисовка задачи в блок списка задач
 * @param {Object} boardComponent список задач
 * @param {Array} allTasks массив задач
 * @param {Object} taskData данные задачи
 * @param {Object} filtersComponent фильтры
 * @param {Number} showingTasksCount количество отображенных задач
 */
const renderTask = (boardComponent, allTasks, taskData, filtersComponent, showingTasksCount) => {
  const tasksList = boardComponent.getElement().querySelector(`.board__tasks`);
  const taskForm = getTaskForm(taskData);

  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      replace(taskForm.view, taskForm.edit);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  showEditForm(
      tasksList, escKeyDownHandler, filtersComponent, allTasks,
      boardComponent, showingTasksCount, taskForm
  );

  submitEditForm(escKeyDownHandler, tasksList, taskForm);

  addTaskToArchive(
      allTasks, taskData, filtersComponent,
      boardComponent, taskForm, showingTasksCount
  );

  deleteFromTaskList(
      allTasks, taskData, filtersComponent,
      boardComponent, taskForm, showingTasksCount
  );

  render(tasksList, taskForm.view);
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


/**
 * Получение индекса задачи
 * @param {Array} allTasks массив задач
 * @param {Object} taskData данные задачи
 * @return {Number} индекс задачи в массиве
 */
const getTaskIndex = (allTasks, taskData) => allTasks.indexOf(taskData);


/**
 * Отображение формы редактирования
 * @param {Object} tasksList контейнер списка задач
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} filtersComponent фильтры
 * @param {Array} allTasks массив задачи
 * @param {Object} boardComponent доска
 * @param {Number} showingTasksCount количество отображенных задач
 * @param {Object} taskForm формы задачи
 */
const showEditForm = (
    tasksList,
    escKeyDownHandler,
    filtersComponent,
    allTasks,
    boardComponent,
    showingTasksCount,
    taskForm) => {
  const editBtnClickHandler = () => {
    if (tasksList.querySelector(`.card--edit`)) {
      document.removeEventListener(`keydown`, escKeyDownHandler);
      updateBoardAndFilters(
          filtersComponent, allTasks, boardComponent, getCheckedFilter(), showingTasksCount
      );

    } else {

      replace(taskForm.edit, taskForm.view);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  taskForm.view.setEditBtnClickHandler(editBtnClickHandler);
};


/**
 * Добавление задачи в архив (и удаление из него)
 * @param {Array} allTasks массив задачи
 * @param {Object} taskData данные задачи
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Object} taskForm формы задачи
 * @param {Number} showingTasksCount количество отображенных задач
 */
const addTaskToArchive = (allTasks, taskData, filtersComponent, boardComponent, taskForm, showingTasksCount) => {
  const archiveBtnClickHandler = () => {
    const archiveBtn = taskForm.view.getElement().querySelector(`.${ButtonClass.ARCHIVE}`);

    const currentFilter = getCheckedFilter();

    if (!archiveBtn.classList.contains(ButtonClass.DISABLED)) {
      archiveBtn.classList.add(ButtonClass.DISABLED);
      allTasks[getTaskIndex(allTasks, taskData)].isArchive = IsArchive.YES;
      updateBoardAndFilters(filtersComponent, allTasks, boardComponent, currentFilter, showingTasksCount);

    } else {

      archiveBtn.classList.remove(ButtonClass.DISABLED);
      allTasks[getTaskIndex(allTasks, taskData)].isArchive = IsArchive.NO;
      updateBoardAndFilters(filtersComponent, allTasks, boardComponent, currentFilter, showingTasksCount);
    }
  };

  taskForm.view.setArchiveBtnClickhandler(archiveBtnClickHandler);
};


/**
 * Отправка формы редактирования
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} tasksList контейнер списка задач
 * @param {Object} taskForm формы задачи
 */
const submitEditForm = (escKeyDownHandler, tasksList, taskForm) => {
  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    document.removeEventListener(`keydown`, escKeyDownHandler);
    replace(taskForm.view, taskForm.edit);
  };

  taskForm.edit.setSubmitHandler(editFormSubmitHandler);
};


/**
 * Удаление задачи с доски
 * @param {Array} allTasks массив задач
 * @param {Object} taskData данные задачи
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardComponent доска
 * @param {Object} taskForm формы задачи
 * @param {Number} showingTasksCount количество отображенных задач
 */
const deleteFromTaskList = (allTasks, taskData, filtersComponent, boardComponent, taskForm, showingTasksCount) => {
  const deleteBtnClickHandler = () => {
    allTasks[getTaskIndex(allTasks, taskData)].isDeleted = IsDeleted.YES;
    updateBoardAndFilters(filtersComponent, allTasks, boardComponent, getCheckedFilter(), showingTasksCount);
  };

  taskForm.edit.setDeleteBtnClickHandler(deleteBtnClickHandler);
};


/**
 * Обновление доски и фильтров в соответствии с текущим активным фильтром
 * @param {Object} filtersComponent фильтры
 * @param {Array} allTasks массив задач
 * @param {Object} boardComponent доска
 * @param {string} currentFilter текущий активный фильтр
 * @param {Number} showingTasksCount количество отображенных задач
 */
const updateBoardAndFilters = (filtersComponent, allTasks, boardComponent, currentFilter, showingTasksCount) => {
  regenerateFilters(filtersComponent, allTasks, boardComponent, currentFilter, showingTasksCount);
  reRenderBoard(allTasks, boardComponent, currentFilter, showingTasksCount);
};


export {renderTask};
