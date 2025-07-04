import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { loadPhotosFromServer } from './server.js';
import './forms.js';

// Находим контейнер фильтров и показываем его после загрузки изображений
const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

let currentPhotos = []; // Хранит загруженные фотографии

// Загрузка фотографий с сервера
loadPhotosFromServer()
  .then((photos) => {
    currentPhotos = photos;

    // Отрисовка начальных фотографий
    renderThumbnails(currentPhotos, openBigPicture);

    // Настройка обработчиков фильтров
    setupFilters();
  })
  .catch(error => console.error('Ошибка загрузки:', error));

function setupFilters() {
  const defaultBtn = document.getElementById('filter-default');
  const randomBtn = document.getElementById('filter-random');
  const discussedBtn = document.getElementById('filter-discussed');

  // Объявляем обработчики для каждого фильтра
  function handleDefaultClick() {
    renderThumbnails(currentPhotos, openBigPicture); // Показываем первоначальную коллекцию
    setActiveFilter(defaultBtn);
  }

  function handleRandomClick() {
    const shuffled = shuffleArray([...currentPhotos]); // Перемешиваем случайным образом
    renderThumbnails(shuffled, openBigPicture);
    setActiveFilter(randomBtn);
  }

  function handleDiscussedClick() {
    const sorted = sortByComments([...currentPhotos]); // Сортируем по количеству комментариев
    renderThumbnails(sorted, openBigPicture);
    setActiveFilter(discussedBtn);
  }

  // Обрабатываем событие click для всех кнопок
  defaultBtn.addEventListener('click', handleDefaultClick);
  randomBtn.addEventListener('click', handleRandomClick);
  discussedBtn.addEventListener('click', handleDiscussedClick);
}

// Установка активного фильтра
function setActiveFilter(button) {
  document.querySelectorAll('.img-filters__button').forEach(btn => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
}

// Вспомогательные функции
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Случайная позиция
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortByComments(photos) {
  return photos.sort((a, b) => b.comments.length - a.comments.length);
}
