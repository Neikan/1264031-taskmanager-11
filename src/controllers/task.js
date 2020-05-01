import TaskComponent from "../components/task/task-view.js";
import TaskEditComponent from "../components/task/task-edit.js";
import {render, replace} from "../utils/change-component";
import {KeyCode, IsDeleted, Position, AttributeTask} from "../consts.js";


const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


const changeDataRules = {
  'isArchive': (taskData) => Object.assign({}, taskData, {isArchive: !taskData.isArchive}),
  'isFavorite': (taskData) => Object.assign({}, taskData, {isFavorite: !taskData.isFavorite}),
  'isDeleted': (taskData) => Object.assign({}, taskData, {isDeleted: IsDeleted.YES})
};


class TaskController {
  constructor(container, viewChangeHandler, dataChangeHandler) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._viewChangeHandler = viewChangeHandler;
    this._dataChangeHandler = dataChangeHandler;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  /**
   * Метод, обеспечивабщий отрисовку форм задачи
   * @param {Object} taskData данные задачи
   */
  render(taskData) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(taskData);
    this._taskEditComponent = new TaskEditComponent(taskData);

    this._setViewHandlers(taskData);
    this._setEditHandlers(taskData);
    this._replaceOldTask(oldTaskEditComponent, oldTaskComponent);
  }


  /**
   * Метод, устанавливающий отображение формы по умолчанию
   */
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }


  /**
   * Метод, добавляющий слушателей событий к форме просмотра задачи
   * @param {Object} taskData данные задачи
   */
  _setViewHandlers(taskData) {
    this._taskComponent.setEditBtnClickHandler(this._editBtnClickHandler());
    this._taskComponent.setArchiveBtnClickHandler(this._archiveBtnClickHandler(taskData));
    this._taskComponent.setFavoritesBtnClickHandler(this._favoritesBtnClickHandler(taskData));
  }


  /**
   * Метод, добавляющий слушателей событий к форме редактирования задачи
   * @param {Object} taskData данные задачи
   */
  _setEditHandlers(taskData) {
    this._taskEditComponent.setSubmitHandler(this._editSubmitHandler());
    this._taskEditComponent.setDeleteBtnClickHandler(this._editDeleteHandler(taskData));
  }


  /**
   * Метод, обеспечивающий обновление карточек контроллера
   * @param {Object} oldTaskEditComponent
   * @param {Object} oldTaskComponent
   */
  _replaceOldTask(oldTaskEditComponent, oldTaskComponent) {
    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render[Position.BEFORE_END](this._container, this._taskComponent);
    }
  }


  /**
   * Метод, обеспечивающий смену формы редактирования на форму просмотра
   */
  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }


  /**
   * Метод, обеспечивающий смену формы просмотра на форму редактирования
   */
  _replaceTaskToEdit() {
    this._viewChangeHandler();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }


  /**
   * Метод, обеспечивабщий создание помощника открытия формы редактирования
   * @return {Function} созданный помощник
   */
  _editBtnClickHandler() {
    return () => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    };
  }


  /**
   * Метод, обеспечивабщий создание помощника для добавления задачи в архив
   * @param {Object} taskData данные задачи
   * @return {Function} созданный помощник
   */
  _archiveBtnClickHandler(taskData) {
    return () => {
      this._dataChangeHandler(taskData, changeDataRules[AttributeTask.IS_ARCHIVE](taskData));
    };
  }


  /**
   * Метод, обеспечивабщий создание помощника для добавления задачи в избранное
   * @param {Object} taskData данные задачи
   * @return {Function} созданный помощник
   */
  _favoritesBtnClickHandler(taskData) {
    return () => {
      this._dataChangeHandler(taskData, changeDataRules[AttributeTask.IS_FAVORITE](taskData));
    };
  }


  /**
   * Метод, обеспечивабщий создание помощника для удаления задачи
   * @param {Object} taskData данные задачи
   * @return {Function} созданный помощник
   */
  _editDeleteHandler(taskData) {
    return () => {
      this._dataChangeHandler(taskData, changeDataRules[AttributeTask.IS_DELETED](taskData));
    };
  }


  /**
   * Метод, обеспечивабщий создание помощника для сохранения измененных данных задачи
   * @return {Function} созданный помощник
   */
  _editSubmitHandler() {
    return (evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    };
  }


  /**
   * Метод, обеспечивабщий закрытие формы редактирования по нажатию на клавишу Escape
   * @param {Object} evt
   */
  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}


export {TaskController};
