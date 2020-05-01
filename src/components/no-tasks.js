import AbstractComponent from "./abstract/abstract-component";


/**
 * Получение разметки блока доски при отсутствии задач
 * @return {string} разметка блока
 */
const createNoTasks = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};


class NoTasks extends AbstractComponent {
  getTemplate() {
    return createNoTasks();
  }
}


export {NoTasks};
