import AbstractComponent from "../abstract/abstract-component";

/**
 * Создание разметки блока списка задач
 * @return {string} разметка блока
 */
const createTasksList = () => `<div class="board__tasks"></div>`;


export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksList();
  }
}
