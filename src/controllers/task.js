import TaskComponent from "../components/task/task.js";
import {render, replace} from "../utils/change-component";
import {Form, KeyCode, AttributeTask, ButtonTask, PART_BTN_CLASS, IsAttribute} from "../consts.js";
import {getCheckedFilter, regenerateFilters} from "../components/filters/filters-helpers.js";


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

    this.escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  render(taskData, allTasks, filtersComponent, showingTasksCount, boardController) {
    this._taskForm = getTaskForm(taskData);

    const dataset = {allTasks, taskData, filtersComponent, taskForm: this._taskForm, showingTasksCount, boardController};

    setViewFormListeners(this._taskForm, dataset, this._escKeyDownHandler, this);
    setEditFormListeners(this._taskForm, dataset, this._escKeyDownHandler);

    // this._taskForm.view.setEditBtnClickHandler(
    //     getEditBtnClickHandler(dataset, this.escKeyDownHandler, this));

    // this._taskForm.view.setArchiveBtnClickhandler(
    //     getArchiveOrFavoriteHandler(dataset, AttributeTask.IS_ARCHIVE, PART_BTN_CLASS + ButtonTask.ARCHIVE));

    // this._taskForm.view.setFavoriteBtnClickhandler(
    //     getArchiveOrFavoriteHandler(dataset, AttributeTask.IS_FAVORITE, PART_BTN_CLASS + ButtonTask.FAVORITE));


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


/**
 * Установка лисенеров для формы просмотра
 * @param {Object} {view} форма просмотра задачи
 * @param {Object} dataset данные
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} tasksList список задач
 */
const setViewFormListeners = ({view}, dataset, escKeyDownHandler, tasksList) => {
  view.setEditBtnClickHandler(
      getEditBtnClickHandler(dataset, escKeyDownHandler, tasksList));

  view.setArchiveBtnClickhandler(
      getArchiveOrFavoriteHandler(dataset, AttributeTask.IS_ARCHIVE, PART_BTN_CLASS + ButtonTask.ARCHIVE));

  view.setFavoriteBtnClickhandler(
      getArchiveOrFavoriteHandler(dataset, AttributeTask.IS_FAVORITE, PART_BTN_CLASS + ButtonTask.FAVORITE));
};


/**
 * Установка лисенеров для формы редактирования задачи
 * @param {Object} taskForm формы задачи
 * @param {Object} dataset данные
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 */
const setEditFormListeners = (taskForm, dataset, escKeyDownHandler) => {
  taskForm.edit.setSubmitHandler(getEditFormSubmitHandler(escKeyDownHandler, taskForm));
  taskForm.edit.setDeleteBtnClickHandler(getDeleteBtnClickHandler(dataset, escKeyDownHandler));
};


/**
 * Получение индекса задачи
 * @param {Array} allTasks данные задач
 * @param {Object} taskData данные задачи
 * @return {Number} индекс задачи
 */
const getTaskIndex = (allTasks, taskData) => allTasks.indexOf(taskData);


/**
 * Получение помощника для закрытия формы дедактирования по нажатию кнопки Esc
 * @param {Object} taskForm формы задачи
 * @return {Function} созданный помощник
 */
const getEscKeyDownHandler = (taskForm) => {
  const handler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      replace(taskForm.view, taskForm.edit);
      document.removeEventListener(`keydown`, handler);
    }
  };
  return handler;
};


/**
 * Получение помощника для отображения формы редактирования
 * @param {Object} dataset данные
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} tasksList контейнер списка задач
 * @return {Function} созданный помощник
 */
const getEditBtnClickHandler = (
    {allTasks, filtersComponent, taskForm, showingTasksCount, boardController},
    escKeyDownHandler,
    tasksList
) => {
  return () => {
    if (tasksList.querySelector(`.card--edit`)) {
      document.removeEventListener(`keydown`, escKeyDownHandler);
      updateBoardAndFilters(allTasks, filtersComponent, boardController, getCheckedFilter(), showingTasksCount);

    } else {
      replace(taskForm.edit, taskForm.view);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };
};


/**
 * Получение помощника для отправки формы редактирования
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} taskForm формы задачи
 * @return {Function} созданный помощник
 */
const getEditFormSubmitHandler = (escKeyDownHandler, taskForm) => {
  return (evt) => {
    evt.preventDefault();
    document.removeEventListener(`keydown`, escKeyDownHandler);
    replace(taskForm.view, taskForm.edit);
  };
};


/**
 * Получение помощника для удаления задачи с доски
 * @param {Object} dataset данные
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @return {Function} созданный помощник
 */
const getDeleteBtnClickHandler = (
    {allTasks, taskData, filtersComponent, showingTasksCount, boardController},
    escKeyDownHandler
) => {
  return () => {
    document.removeEventListener(`keydown`, escKeyDownHandler);
    changeTaskAttribute(
        allTasks, taskData, filtersComponent, boardController,
        showingTasksCount, AttributeTask.IS_DELETED, IsAttribute.YES
    );
  };
};


/**
 * Обновление доски и фильтров в соответствии с текущим активным фильтром
 * @param {Array} allTasks данные задач
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardController контроллер доски
 * @param {string} currentFilter текущий активный фильтр
 * @param {Number} showingTasksCount количество отображенных задач
 */
const updateBoardAndFilters = (
    allTasks, filtersComponent, boardController, currentFilter, showingTasksCount
) => {

  regenerateFilters(allTasks, filtersComponent, boardController, currentFilter);
  boardController.replace(allTasks, filtersComponent, currentFilter, showingTasksCount);
};


/**
 * Изменение атрибута задачи
 * @param {Array} allTasks данные задач
 * @param {Object} taskData данные задачи
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardController контроллер доски
 * @param {Number} showingTasksCount количество отображенных задач
 * @param {string} attributeTask изменяемый атрибут задачи
 * @param {Boolean} attributeValue значение атрибута
 */
const changeTaskAttribute = (
    allTasks, taskData, filtersComponent, boardController,
    showingTasksCount, attributeTask, attributeValue
) => {

  switch (attributeTask) {
    case (AttributeTask.IS_ARCHIVE):
      allTasks[getTaskIndex(allTasks, taskData)].isArchive = attributeValue;
      break;
    case (AttributeTask.IS_FAVORITE):
      allTasks[getTaskIndex(allTasks, taskData)].isFavorite = attributeValue;
      break;
    case (AttributeTask.IS_DELETED):
      allTasks[getTaskIndex(allTasks, taskData)].isDeleted = attributeValue;
      break;
    default:
      break;
  }

  updateBoardAndFilters(allTasks, filtersComponent, boardController, getCheckedFilter(), showingTasksCount);
};


/**
 * Получение помощника для удаления/добавления в "Архив" и "Избранное"
 * @param {Object} dataset данные
 * @param {string} attributeTask изменяемый атрибут задачи
 * @param {string} buttonName название кнопки
 * @return {Function} созданный помощник
 */
const getArchiveOrFavoriteHandler = (
    {allTasks, taskData, filtersComponent, taskForm, showingTasksCount, boardController},
    attributeTask,
    buttonName) => {

  return () => {
    const button = taskForm.view.getElement().querySelector(`.${buttonName}`);
    showingTasksCount = getCurrentCountTasks();
    if (!button.classList.contains(PART_BTN_CLASS + ButtonTask.DISABLED)) {
      button.classList.add(PART_BTN_CLASS + ButtonTask.DISABLED);
      changeTaskAttribute(
          allTasks, taskData, filtersComponent, boardController,
          showingTasksCount, attributeTask, IsAttribute.YES
      );

    } else {

      button.classList.remove(PART_BTN_CLASS + ButtonTask.DISABLED);
      changeTaskAttribute(
          allTasks, taskData, filtersComponent, boardController,
          showingTasksCount, attributeTask, IsAttribute.NO
      );
    }
  };
};


/**
 * Получение текущего количества задач на доске
 * @return {Number} количество задач
 */
const getCurrentCountTasks = () => document.querySelectorAll(`.card`).length;


export {getCurrentCountTasks};
