import {SortType, FilterType} from "../consts";
import {filterRules} from "../utils/common";


const FILTER_MARK = `filter__`;

export default class TasksModel {
  constructor() {
    this._tasksData = [];
    this._filterType = FilterType.DEFAULT;
    this._sortType = SortType.DEFAULT;
  }


  /**
   * Метод, обеспечивающий присвоение данным модели действительных значений данных задач
   * @param {Array} tasksData данные задач
   */
  setTasksData(tasksData) {
    this._tasksData = Array.from(tasksData);
  }


  /**
   * Метод, обеспечивающий присвоение фильтру модели действительного значения примененного фильтра
   * @param {string} filterType примененный фильтр
   */
  setFilter(filterType) {
    this._filterType = filterType;
  }


  /**
   * Метод, обеспечивающий получение данных задач
   * @return {Array} данные
   */
  getTasksData() {
    return this._tasksData;
  }


  /**
   * Метод, обеспечивающий получение данных задач
   * @return {Array} данные
   */
  getFilter() {
    return this._filterType;
  }


  getFilteredTasks() {
    const {tasksNotDelete, tasksNotArchive} = this.getTasksForFilters();
    const nameFilter = this._filterType.replace(FILTER_MARK, ``);

    return (this._filterType === FilterType.ARCHIVE) ?
      filterRules[nameFilter](tasksNotDelete) :
      filterRules[nameFilter](tasksNotArchive);
  }


  /**
   * Получение задач для фильтрации
   * @return {Object} данные не удаленных задач и данные задач не в архиве
   */
  getTasksForFilters() {
    const tasksNotDelete = (this._tasksData.length) ?
      this._tasksData.filter((task) => !task.isDeleted) :
      [];

    const tasksNotArchive = (tasksNotDelete.length) ?
      tasksNotDelete.filter((task) => !task.isArchive) :
      [];

    return {tasksNotDelete, tasksNotArchive};
  }
}
