import {COLORS} from "../../../consts";
import {createColorsMarkup} from "./colorItem";

export const createColorsBlock = (color) => {
  return (`
    <div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${createColorsMarkup(COLORS, color)}
      </div>
    </div>
  `);
};
