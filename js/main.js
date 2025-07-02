
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

// Объявляем переменные на верхнем уровне
let currentPhotos = [];

const filtersContainer = document.querySelector('.img-filters');
const filterDefaultBtn = document.getElementById('filter-default');
const filterRandomBtn = document.getElementById('filter-random');
const filterDiscussedBtn = document.getElementById('filter-discussed');

const debouncedUpdateThumbnails = debounce(updateThumbnails);

// Вынесенные функции

function getDefaultPhotos() {
  return [...currentPhotos];
}

function getRandomPhotos() {
  const shuffled = [...currentPhotos].sort(() => Math.random() - Math.random());
  return shuffled.slice(0, 10);
}

function getDiscussedPhotos() {
  return [...currentPhotos].slice().sort((a, b) => b.comments.length - a.comments.length);
}

function clearThumbnails() {
  const thumbnailsContainer = document.querySelector('.pictures');
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
  }
}

function updateThumbnails(filterType) {
  clearThumbnails();
  let filteredPhotos;
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

function activateFilters() {
  filtersContainer.classList.remove('img-filters--inactive');

  document.querySelectorAll('.img-filters__button').forEach((button) => {
    button.addEventListener('click', () => {
      // Удаляем активный класс у всех кнопок
      document.querySelectorAll('.img-filters__button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
      // Добавляем активный класс текущей кнопке
      button.classList.add('img-filters__button--active');

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

// Основная функция инициализации
async function init() {
  try {
    currentPhotos = await loadPhotosFromServer();

    // Изначально показываем все фотографии без фильтрации
    renderThumbnails(currentPhotos, openBigPicture);

    // Активируем фильтры после загрузки фотографий
    activateFilters();

  } catch (error) {
    alert(error.message);
  }
}

// Запуск инициализации
init();

// Вспомогательная функция debounce
function debounce(callback, delay = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
