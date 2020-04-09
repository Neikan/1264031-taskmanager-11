/**
 * Создание разметки кнопок формы создания / редактирования задачи
 * @return {string} разметка кнопок формы создания / редактирования
 */
export const getEditButtons = () => {
  return (`
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
`);
};
