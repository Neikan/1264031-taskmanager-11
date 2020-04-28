import {ButtonTask} from "../../../../../consts";
import {checkIsRepeating} from "../../../../../utils/common";

/**
 * Создание разметки блока кнопок формы создания / редактирования задачи
 * @param {string} options параметры формы редактирования задачи
 * @return {string} разметка блока
 */
const getEditButtons = ({isDateShowing, isRepeatingTask, activeRepeatingDays}) => {
  const isBlockSaveButton = (isDateShowing && isRepeatingTask)
    || (isRepeatingTask && !checkIsRepeating(activeRepeatingDays));

  const checkDisabled = isBlockSaveButton ? ButtonTask.DISABLED : ``;

  return (
    `<div class="card__status-btns">
      <button class="card__save" type="submit" ${checkDisabled}>save</button>
      <button class="card__delete" type="button">delete</button>
    </div>`
  );
};

export {getEditButtons};
