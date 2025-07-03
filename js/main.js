// import { renderThumbnails } from './thumbnails.js';
// import { openBigPicture } from './big-picture.js';
// import { loadPhotosFromServer } from './server.js';
// import './forms.js';

// const photos = await loadPhotosFromServer();
// renderThumbnails(photos, openBigPicture);


import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { loadPhotosFromServer } from './server.js';
import './forms.js';

// Находим контейнер фильтров и показываем его после загрузки изображений
const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

let currentPhotos = [];

// Загружаем фотографии с сервера
loadPhotosFromServer().then((photos) => {
  currentPhotos = photos;

  // Отрисовываем изначальные фото
  renderThumbnails(currentPhotos, openBigPicture);

  // Объявляем обработчики фильтров
  setupFilters();
});

function setupFilters() {
  const defaultBtn = document.getElementById('filter-default');
  const randomBtn = document.getElementById('filter-random');
  const discussedBtn = document.getElementById('filter-discussed');

  // Объявляем дебаунс-функцию для каждого фильтра
  const debouncedDefault = debounce(() => {
    renderThumbnails(currentPhotos, openBigPicture);
    setActiveFilter(defaultBtn);
  }, 500);

  const debouncedRandom = debounce(() => {
    const shuffled = [...currentPhotos].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    renderThumbnails(selected, openBigPicture);
    setActiveFilter(randomBtn);
  }, 500);

  const debouncedDiscussed = debounce(() => {
    const sorted = [...currentPhotos].sort((a, b) => b.comments.length - a.comments.length);
    renderThumbnails(sorted, openBigPicture);
    setActiveFilter(discussedBtn);
  }, 500);

  // Назначаем обработчики кликов
  defaultBtn.addEventListener('click', debouncedDefault);
  randomBtn.addEventListener('click', debouncedRandom);
  discussedBtn.addEventListener('click', debouncedDiscussed);
}

// Функция для установки активной кнопки фильтра
function setActiveFilter(activeButton) {
   document.querySelectorAll('.img-filters__button').forEach(btn => btn.classList.remove('img-filters__button--active'));
   activeButton.classList.add('img-filters__button--active');
}

// Предполагается, что у вас есть функция debounce. Если нет — добавьте её:
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
