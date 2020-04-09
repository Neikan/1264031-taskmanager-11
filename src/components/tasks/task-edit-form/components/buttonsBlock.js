/**
 * Создание разметкир блока кнопок управления задачей
 * @return {string} разметка блока кнопок управления задачей
 */
export const createButtonsBlock = () => {
  return (`
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  `);
};
