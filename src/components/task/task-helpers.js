import TaskComponent from "./task";
import {Form, KeyCode, AttributeTask, ButtonTask, IsAttribute} from "../../consts.js";
import {render, replace} from "../../utils/change-component";
import {regenerateFilters, getCheckedFilter} from "../filters/filters-helpers";


const BTN_DISABLED_CLASS = `card__btn--disabled`;


/**
 * Отрисовка задачи в блок списка задач
 * @param {Object} tasksList список задач
 * @param {Array} allTasks данные задач
 * @param {Object} taskData данные задачи
 * @param {Object} filtersComponent фильтры
 * @param {Number} showingTasksCount количество отображенных задач
 * @param {Object} boardController контроллер доски
 */
const renderTask = (tasksList, allTasks, taskData, filtersComponent, showingTasksCount, boardController) => {
  const taskForm = getTaskForm(taskData);

  const dataset = {allTasks, taskData, filtersComponent, taskForm, showingTasksCount, boardController};

  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      replace(taskForm.view, taskForm.edit);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  showEditForm(dataset, escKeyDownHandler, tasksList);

  submitEditForm(escKeyDownHandler, taskForm);
  deleteFromTaskList(dataset);

  taskForm.view.setArchiveBtnClickhandler(
      getArchiveOrFavoriteHandler(dataset, AttributeTask.IS_ARCHIVE, ButtonTask.ARCHIVE)
  );

  taskForm.view.setFavoriteBtnClickhandler(
      getArchiveOrFavoriteHandler(dataset, AttributeTask.IS_FAVORITE, ButtonTask.FAVORITE)
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
 * @param {Array} allTasks данные задач
 * @param {Object} taskData данные задачи
 * @return {Number} индекс задачи
 */
const getTaskIndex = (allTasks, taskData) => allTasks.indexOf(taskData);


/**
 * Отображение формы редактирования
 * @param {Object} dataset данные
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} tasksList контейнер списка задач
 */
const showEditForm = (
    {allTasks, filtersComponent, taskForm, showingTasksCount, boardController},
    escKeyDownHandler,
    tasksList) => {

  const editBtnClickHandler = () => {
    if (tasksList.querySelector(`.card--edit`)) {

      document.removeEventListener(`keydown`, escKeyDownHandler);
      updateBoardAndFilters(allTasks, filtersComponent, boardController, getCheckedFilter(), showingTasksCount);

    } else {

      replace(taskForm.edit, taskForm.view);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  taskForm.view.setEditBtnClickHandler(editBtnClickHandler);
};


/**
 * Отправка формы редактирования
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие формы редактирования без сохранения
 * @param {Object} taskForm формы задачи
 */
const submitEditForm = (escKeyDownHandler, taskForm) => {
  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    document.removeEventListener(`keydown`, escKeyDownHandler);
    replace(taskForm.view, taskForm.edit);
  };

  taskForm.edit.setSubmitHandler(editFormSubmitHandler);
};


/**
 * Удаление задачи с доски
 * @param {Object} dataset данные
 */
const deleteFromTaskList = ({allTasks, taskData, filtersComponent, taskForm, showingTasksCount, boardController}) => {
  const deleteBtnClickHandler = () => {
    changeTaskAttribute(
        allTasks, taskData, filtersComponent, boardController,
        showingTasksCount, AttributeTask.IS_DELETED, IsAttribute.YES
    );
  };

  taskForm.edit.setDeleteBtnClickHandler(deleteBtnClickHandler);
};


/**
 * Обновление доски и фильтров в соответствии с текущим активным фильтром
 * @param {Array} allTasks данные задач
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardController контроллер доски
 * @param {string} currentFilter текущий активный фильтр
 * @param {Number} showingTasksCount количество отображенных задач
 */
const updateBoardAndFilters = (allTasks, filtersComponent, boardController, currentFilter, showingTasksCount) => {
  regenerateFilters(allTasks, filtersComponent, boardController, currentFilter, showingTasksCount);
  boardController.replace(allTasks, filtersComponent, currentFilter, showingTasksCount);
};


/**
 * Изменение
 * @param {Array} allTasks данные задач
 * @param {Object} taskData данные задачи
 * @param {Object} filtersComponent фильтры
 * @param {Object} boardController контроллер доски
 * @param {Number} showingTasksCount количество отображенных задач
 * @param {string} attributeTask изменяемый атрибут задачи
 * @param {Boolean} attributeValue значение атрибута
 */
const changeTaskAttribute = (allTasks, taskData, filtersComponent, boardController, showingTasksCount, attributeTask, attributeValue) => {
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
    if (!button.classList.contains(BTN_DISABLED_CLASS)) {
      button.classList.add(BTN_DISABLED_CLASS);
      changeTaskAttribute(allTasks, taskData, filtersComponent, boardController, showingTasksCount, attributeTask, IsAttribute.YES);

    } else {

      button.classList.remove(BTN_DISABLED_CLASS);
      changeTaskAttribute(allTasks, taskData, filtersComponent, boardController, showingTasksCount, attributeTask, IsAttribute.NO);
    }
  };
};


export {renderTask};
