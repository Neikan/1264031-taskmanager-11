import {renderLoadMore} from "../load-more-btn/load-more-btn-helpers";
import {remove} from "../../utils/change-component";
import {getCurrentCountTasks} from "../../utils/common";
import {renderTaskControllers} from "../../controllers/board";


/**
 * Правила сортировки
 */
const sortRules = {
  'date-down': (showingTasks) => showingTasks.sort((a, b) => a.dueDate - b.dueDate),
  'date-up': (showingTasks) => showingTasks.sort((a, b) => b.dueDate - a.dueDate),
  'default': (showingTasks) => showingTasks,
};


/**
 * Сортировка задач
 * @param {Array} filteredTasks данные задач
 * @param {string} sortType тип сортировки
 * @return {Array} отсортированные данные задач
 */
const getSortedTasks = (filteredTasks, sortType) => sortRules[sortType](filteredTasks.slice());


/**
 * Отрисовка отсортированных задач
 * @param {Object} container контейнер
 * @param {Array} filteredTasks данные задач
 * @param {Number} showingTasksCount количество задач на доске
 * @param {Object} tasksList список задач
 * @param {Object} boardController
 */
const renderSortedTasks = (container, filteredTasks, showingTasksCount, tasksList, boardController) => {
  const sortClickHandler = (sortType) => {
    showingTasksCount = getCurrentCountTasks();
    const sortedTasks = getSortedTasks(filteredTasks, sortType);

    tasksList.innerHTML = ``;
    const newTaskControllers = renderTaskControllers(tasksList,
        sortedTasks.slice(0, showingTasksCount), boardController);
    boardController._showedTaskControllers = newTaskControllers;

    remove(boardController._loadMoreBtnComponent);
    renderLoadMore(container, sortedTasks, showingTasksCount, tasksList, boardController);
  };

  boardController._sortComponent.setSortTypeChangeHandler(sortClickHandler);
};


export {renderSortedTasks, getSortedTasks};
