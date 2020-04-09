import {MenuItems} from "../../components/consts";
import {createMenuItem} from "./components/field";
import {createMenuSection} from "./components/section";

/**
 * Создание шаблона главного меню
 * @return {string} - главное меню
 */
export const createMenu = () => {
  return createMenuSection(MenuItems
    .map((it) => createMenuItem(it))
    .join(`\n`));
};
