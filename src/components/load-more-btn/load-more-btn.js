import AbstractComponent from "../abstract/abstract-component";


/**
 * Создание разметки кнопки показа оставшихся задач
 * @return {string} разметка кнопки
 */
const createLoadMore = () => {
  return (`<button class="load-more" type="button">load more</button>`);
};

export default class LoadMoreBtn extends AbstractComponent {
  getTemplate() {
    return createLoadMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
