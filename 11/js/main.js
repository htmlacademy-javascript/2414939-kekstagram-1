// import { renderThumbnails } from './thumbnails.js';
// import { openBigPicture } from './big-picture.js';
// import { loadPhotosFromServer } from './server.js';
// import './forms.js';

// const photos = await loadPhotosFromServer();
// renderThumbnails(photos, openBigPicture);


import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { loadPhotosFromServer } from './server.js'; // Импорт функции загрузки
import './forms.js';

// Массив фотографий
let photos = [];

// DOM элементы
const filtersContainer = document.querySelector('.img-filters');
const filterDefaultBtn = document.getElementById('filter-default');
const filterRandomBtn = document.getElementById('filter-random');
const filterDiscussedBtn = document.getElementById('filter-discussed');

/**
 * Возвращает все фотографии без фильтрации.
 * @returns {Array}
 */
function getDefaultPhotos() {
  return [...photos];
}

/**
 * Возвращает случайные 10 фотографий.
 * @returns {Array}
 */
function getRandomPhotos() {
  const shuffled = [...photos].sort(() => Math.random() - Math.random());
  return shuffled.slice(0, 10);
}

/**
 * Возвращает фотографии, отсортированные по количеству комментариев (по убыванию).
 * @returns {Array}
 */
function getDiscussedPhotos() {
  return [...photos].slice().sort((a, b) => b.comments.length - a.comments.length);
}

/**
 * Очищает контейнер с миниатюрами.
 */
function clearThumbnails() {
  const thumbnailsContainer = document.querySelector('.pictures'); // предполагается, что контейнер с миниатюрами имеет класс 'pictures'
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
  }
}

/**
 * Обновляет миниатюры в зависимости от выбранного фильтра.
 * @param {string} filterType - тип фильтра ('default', 'random', 'discussed')
 */
function updateThumbnails(filterType) {
  clearThumbnails();

  let filteredPhotos = [];
  switch (filterType) {
    case 'random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    case 'default':
    default:
      filteredPhotos = getDefaultPhotos();
      break;
  }

  renderThumbnails(filteredPhotos, openBigPicture);
}

/**
 * Функция debounce для ограничения частоты вызова функции.
 * @param {Function} func - функция для дебаунса
 * @param {number} timeout - задержка в миллисекундах
 * @returns {Function}
 */
function debounce(func, timeout = 500) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const debouncedUpdateThumbnails = debounce(updateThumbnails);

/**
 * Активирует обработчики фильтров.
 */
function activateFilters() {
  filtersContainer.classList.remove('img-filters--inactive');

  document.querySelectorAll('.img-filters__button').forEach((button) => {
    button.addEventListener('click', () => {
      // Удаляем активный класс у всех кнопок
      document.querySelectorAll('.img-filters__button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
      // Добавляем активный класс текущей кнопке
      button.classList.add('img-filters__button--active');

      // Вызов обновления с задержкой (debounce)
      if (button.id === 'filter-random') {
        debouncedUpdateThumbnails('random');
      } else if (button.id === 'filter-discussed') {
        debouncedUpdateThumbnails('discussed');
      } else {
        debouncedUpdateThumbnails('default');
      }
    });
  });
}

// Загрузка фотографий и запуск приложения
loadPhotosFromServer()
  .then((loadedPhotos) => {
    photos = loadedPhotos;

    // Изначально показываем все фотографии без фильтрации
    renderThumbnails(photos, openBigPicture);

    // Активируем фильтры после загрузки фотографий
    activateFilters();
  })
  .catch(() => {
    alert('Ошибка при загрузке фотографий с сервера.');
});
