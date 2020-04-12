import {FILTER_NAMES, CountTask} from "../../consts";

/**
 * Генерация фильтров
 * @return {Object} фильтр с названием и числом элементов, соответствующих ему
 */
const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it.name,
      checked: it.checked,
      count: Math.floor(Math.random() * CountTask.ALL),
    };
  });
};

export {generateFilters};
