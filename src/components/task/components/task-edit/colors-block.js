import {COLORS, Checked} from "../../../../consts";

/**
 * Создание разметки блока выбора цвета
 * @param {string} color цвет
 * @return {string} разметка блока
 */
const createColorsBlock = (color) => {
  return (
    `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${createColors(COLORS, color)}
      </div>
    </div>`
  );
};

/**
 * Создание разметки блока нескольких цветов
 * @param {Array} colors цвета
 * @param {string} currentColor
 * @return {string} разметка блока
 */
const createColors = (colors, currentColor) =>
  colors.map((color, index) => createColor(color, index, currentColor)).join(`\n`);

/**
 * Создание разметки блока цвета
 * @param {string} color цвет
 * @param {Number} index индекс цвета в массиве цветов
 * @param {string} currentColor выбранный цвет по умолчанию
 * @return {string} разметка блока
 */
const createColor = (color, index, currentColor) => {
  const checked = currentColor === color ? Checked.CLASS : ``;

  return (
    `<input
      type="radio"
      id="color-${color}-${index}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${checked}/>
    <label
      for="color-${color}-${index}"
      class="card__color card__color--${color}">${color}
    </label>`
  );
};

export {createColorsBlock};
