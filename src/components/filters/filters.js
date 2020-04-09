import {generateFilters} from "../../mock/components/filters";
import {createFilter} from "./components/field";
import {createFilterSection} from "./components/section";

/**
 * Создание разметки для перечня фильтров
 * @return {string} разметка перечня фильтров
 */
export const createFilters = () => {
  return createFilterSection(generateFilters()
    .map((it, i) => createFilter(it, i === 0))
    .join(`\n`));
};
