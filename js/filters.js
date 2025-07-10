// filters.js

// Вспомогательная функция debounce
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Функция для перемешивания массива (рандомизация)
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Функция для сортировки по количеству комментариев
export function sortByComments(photos) {
  // Создаем копию массива, чтобы не мутировать оригинал
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
}

// Установка активного фильтра
export function setActiveFilter(button) {
  document.querySelectorAll('.img-filters__button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
}

// Основная функция настройки фильтров
export function setupFilters(currentPhotos, renderThumbnails, openBigPicture) {
  const defaultBtn = document.getElementById('filter-default');
  const randomBtn = document.getElementById('filter-random');
  const discussedBtn = document.getElementById('filter-discussed');

  // Обработчик для фильтра "По умолчанию"
  function handleDefaultClick() {
    renderThumbnails(currentPhotos, openBigPicture);
    setActiveFilter(defaultBtn);
  }

  // Обработчик для фильтра "Случайные"
  function handleRandomClick() {
    const shuffled = shuffleArray([...currentPhotos]);
    renderThumbnails(shuffled, openBigPicture);
    setActiveFilter(randomBtn);
  }

  // Обработчик для фильтра "Обсуждаемые"
  function handleDiscussedClick() {
    const sorted = sortByComments([...currentPhotos]);
    renderThumbnails(sorted, openBigPicture);
    setActiveFilter(discussedBtn);
  }

  // Оборачиваем обработчики в debounce (500 мс)
  const debouncedRenderDefault = debounce(handleDefaultClick, 500);
  const debouncedRenderRandom = debounce(handleRandomClick, 500);
  const debouncedRenderDiscussed = debounce(handleDiscussedClick, 500);

  // Назначаем обработчики событий
  defaultBtn.addEventListener('click', debouncedRenderDefault);
  randomBtn.addEventListener('click', debouncedRenderRandom);
  discussedBtn.addEventListener('click', debouncedRenderDiscussed);
}
