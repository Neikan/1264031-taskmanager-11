import {MenuItems} from "../consts";
import {createMenuItem} from "./components/field";
import {createMenuSection} from "./components/section";

/**
 * Создание разметки главного меню
 * @return {string} разметка главного меню
 */
export const createMenu = () => {
  return createMenuSection(MenuItems
    .map((it) => createMenuItem(it))
    .join(`\n`));
};
