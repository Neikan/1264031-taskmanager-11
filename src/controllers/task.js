import TaskComponent from "../components/task/task-view.js";
import TaskEditComponent from "../components/task/task-edit.js";
import {render, replace} from "../utils/change-component";
import {KeyCode, IsDeleted, Position} from "../consts.js";


const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export default class TaskController {
  constructor(container, boardController) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._boardController = boardController;
    this._viewChangeHandler = boardController._viewChangeHandler;
    this._dataChangeHandler = boardController._dataChangeHandler;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._replaceEditToTask = this._replaceEditToTask.bind(this);
    this._replaceTaskToEdit = this._replaceTaskToEdit.bind(this);
    this._replaceOldTask = this._replaceOldTask.bind(this);
    this._setDefaultView = this.setDefaultView.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
  }


  render(taskData) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(taskData);
    this._taskEditComponent = new TaskEditComponent(taskData);

    this._setViewHandlers(taskData, this._boardController);
    this._setEditHandlers(taskData);

    this._replaceOldTask(oldTaskEditComponent, oldTaskComponent);
  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }


  _setEditHandlers(taskData) {
    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    this._taskEditComponent.setDeleteBtnClickHandler(() => {
      this._dataChangeHandler(taskData, Object.assign({}, taskData, {
        isDeleted: IsDeleted.YES
      }));
      this._boardController.rerender();
    });
  }


  _setViewHandlers(taskData) {
    this._taskComponent.setEditBtnClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    });

    this._taskComponent.setArchiveBtnClickHandler(() => {
      this._dataChangeHandler(taskData, Object.assign({}, taskData, {
        isArchive: !taskData.isArchive,
      }));
      this._boardController.rerender();
    });

    this._taskComponent.setFavoritesBtnClickHandler(() => {
      this._dataChangeHandler(taskData, Object.assign({}, taskData, {
        isFavorite: !taskData.isFavorite,
      }));
      this._boardController.rerender();
    });
  }


  _replaceOldTask(oldTaskEditComponent, oldTaskComponent) {
    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render[Position.BEFORE_END](this._container, this._taskComponent);
    }
  }


  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }


  _replaceTaskToEdit() {
    this._viewChangeHandler();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }


  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}
