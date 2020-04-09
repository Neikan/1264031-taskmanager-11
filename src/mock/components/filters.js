import {filterNames} from "../consts";

/**
 * Генерация фильтров
 * @return {Object} фильтр с названием и числом элементов, соответствующих ему
 */
export const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};
