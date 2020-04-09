import {generateFilters} from "../../mock/components/filters";
import {createFilter} from "./components/field";
import {createFilterSection} from "./components/section";

/**
 * Создание перечня фильтров
 * @return {string} перечень фильтров для разметки
 */
export const createFilters = () => {
  return createFilterSection(generateFilters()
    .map((it, i) => createFilter(it, i === 0))
    .join(`\n`));
};
