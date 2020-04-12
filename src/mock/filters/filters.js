import {FILTER_NAMES} from "../../consts";

/**
 * Генерация фильтров
 * @return {Object} фильтр с названием и числом элементов, соответствующих ему
 */
const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};
