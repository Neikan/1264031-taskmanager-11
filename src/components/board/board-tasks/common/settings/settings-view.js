/**
 * Создание разметки блока с описанием задачи для формы создания/редактирования
 * @param {string} date дата
 * @param {string} time время
 * @return {string} разметка блока с описанием задачи
 */
const getViewSettings = (date, time) => {
  return (`
    <div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          <div class="card__date-deadline">
            <p class="card__input-deadline-wrap">
              <span class="card__date">${date}</span>
              <span class="card__time">${time}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `);
};

export {getViewSettings};
