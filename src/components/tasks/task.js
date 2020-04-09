import {getViewForm} from "./components/formView";
import {getEditForm} from "./components/formEdit";

/**
 * Создание шаблона отображения существующей карточки задачи
 * @param {Object} task задача
 * @param {Boolean} isView флаг, отвечающий за вид отображаемой формы
 * @return {string} форма просмотра задачи
 */
export const createTask = (task, isView) => {
  const {dueDate, repeatingDays} = task;

  const Parameters = {
    isExpired: dueDate instanceof Date && dueDate < Date.now(),
    isRepeatingTask: Object.values(repeatingDays).some(Boolean)
  };

  const ClassesMarkup = {
    repeatClass: Parameters.isRepeatingTask ? `card--repeat` : ``,
    deadlineClass: Parameters.isExpired ? `card--deadline` : ``
  };

  return isView ? getViewForm(task, isView, ClassesMarkup) : getEditForm(task, isView, ClassesMarkup, Parameters);
};
