import {generateFilters} from "../mock/filters/filters";
import {render} from "../utils";
import {Position} from "../consts";
import FiltersComponent from "./../components/filters/filters.js";


/**
 * Пересоздание компонента фильтров с обновленным массивом задач
 * @param {Object} filtersComponent фильтры
 * @param {Array} tasks задачи
 */
const regenerateFilters = (filtersComponent, tasks) => {
  const mainNode = document.querySelector(`.main__control`);
  filtersComponent.getElement().remove();
  filtersComponent.removeElement();

  const newFilters = generateFilters(tasks);
  filtersComponent = new FiltersComponent(newFilters);
  render(mainNode, filtersComponent.getElement(), Position.AFTER_END);
};


export {regenerateFilters};
