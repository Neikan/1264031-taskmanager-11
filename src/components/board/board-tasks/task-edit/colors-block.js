import {COLORS} from "../../../../consts";

/**
 * Создание разметки блока выбора цвета
 * @param {string} color цвет
 * @return {string} разметка блока
 */
const createColorsBlock = (color) => {
  return (`
    <div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${createColors(COLORS, color)}
      </div>
    </div>
  `);
};

/**
 * Создание разметки нескольких цветов
 * @param {Array} colors цвета
 * @param {string} currentColor
 * @return {string} разметка нескольких цветов
 */
const createColors = (colors, currentColor) =>
  colors.map((color, index) => createColor(color, index, currentColor)).join(`\n`);

/**
 * Создание разметки цвета
 * @param {string} color
 * @param {Number} index
 * @param {string} currentColor
 * @return {string} разметка цвета
 */
const createColor = (color, index, currentColor) => {
  const current = currentColor === color ? `checked` : ``;

  return (`
    <input
      type="radio"
      id="color-${color}-${index}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${current}
    />
    <label
      for="color-${color}-${index}"
      class="card__color card__color--${color}"
      >${color}</label
    >
  `);
};

export {createColorsBlock};
