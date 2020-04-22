import {MEMU_ITEMS} from "../../consts";
import {createElement} from "../../utils";
import AbstractComponent from "../abstract/abstract-component";

/**
 * Создание разметки блока главного меню
 * @return {string} разметка блока
 */
const createMenu = () => createMenuSection(MEMU_ITEMS.map(createMenuItem).join(`\n`));

/**
 * Создание разметки блока главного меню
 * @param {string} menuMarkup разхметка пунктов меню
 * @return {string} разметка блока
 */
const createMenuSection = (menuMarkup) => {
  return (
    `<section class="control__btn-wrap">
      ${menuMarkup}
    </section>`
  );
};

/**
 * Создание разметки блока пункта меню
 * @param {Object} {пункт меню}
 * @return {string} разметка блока
 */
const createMenuItem = ({name, label}) => {
  return (
    `<input
      type="radio"
      name="control"
      id="control__${name}"
      class="control__input visually-hidden"/>
    <label for="control__${name}" class="control__label control__label--${name}"
      >${label}</label>`
  );
};


/**
 * Создание класса меню
 */
export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenu();
  }
}
