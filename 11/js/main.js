// //
// import { renderThumbnails } from './thumbnails.js';
// import { openBigPicture } from './big-picture.js';
// import { loadPhotosFromServer } from './server.js';
// import './forms.js';

// // Находим контейнер фильтров и показываем его после загрузки изображений
// const filtersContainer = document.querySelector('.img-filters');
// filtersContainer.classList.remove('img-filters--inactive');

// let currentPhotos = []; // Хранит загруженные фотографии

// // Загрузка фотографий с сервера
// loadPhotosFromServer()
//   .then((photos) => {
//     currentPhotos = photos;

//     // Отрисовка начальных фотографий
//     renderThumbnails(currentPhotos, openBigPicture);

//     // Настройка обработчиков фильтров
//     setupFilters();
//   });
// // .catch(error => console.error('Ошибка загрузки:', error));

// // Функция debounce для ограничения частоты вызова
// function debounce(func, delay) {
//   let timeoutId;
//   return function(...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }

// function setupFilters() {
//   const defaultBtn = document.getElementById('filter-default');
//   const randomBtn = document.getElementById('filter-random');
//   const discussedBtn = document.getElementById('filter-discussed');

//   // Объявляем обработчики для каждого фильтра
//   function handleDefaultClick() {
//     renderThumbnails(currentPhotos, openBigPicture); // Показываем первоначальную коллекцию
//     setActiveFilter(defaultBtn);
//   }

//   function handleRandomClick() {
//     const shuffled = shuffleArray([...currentPhotos]);
//     renderThumbnails(shuffled, openBigPicture);
//     setActiveFilter(randomBtn);
//   }

//   function handleDiscussedClick() {
//     const sorted = sortByComments([...currentPhotos]);
//     renderThumbnails(sorted, openBigPicture);
//     setActiveFilter(discussedBtn);
//   }

//   // Оборачиваем функции в debounce (500 мс)
//   const debouncedRenderDefault = debounce(handleDefaultClick, 500);
//   const debouncedRenderRandom = debounce(handleRandomClick, 500);
//   const debouncedRenderDiscussed = debounce(handleDiscussedClick, 500);

//   // Назначаем обработчики
//   defaultBtn.addEventListener('click', debouncedRenderDefault);
//   randomBtn.addEventListener('click', debouncedRenderRandom);
//   discussedBtn.addEventListener('click', debouncedRenderDiscussed);
// }

// // Установка активного фильтра
// function setActiveFilter(button) {
//   document.querySelectorAll('.img-filters__button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
//   button.classList.add('img-filters__button--active');
// }

// // Вспомогательные функции
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function sortByComments(photos) {
//   return photos.sort((a, b) => b.comments.length - a.comments.length);
// }


// main.js

import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { loadPhotosFromServer } from './server.js';
import { showComments, clearComments, loadMoreComments } from './comments.js'; // Импорт функций для комментариев
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
  // .catch(error => console.error('Ошибка загрузки:', error));

// Функция debounce для ограничения частоты вызова
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function setupFilters() {
  const defaultBtn = document.getElementById('filter-default');
  const randomBtn = document.getElementById('filter-random');
  const discussedBtn = document.getElementById('filter-discussed');

  // Объявляем обработчики для каждого фильтра
  function handleDefaultClick() {
    renderThumbnails(currentPhotos, openBigPicture);
    setActiveFilter(defaultBtn);
  }

  function handleRandomClick() {
    const shuffled = shuffleArray([...currentPhotos]);
    renderThumbnails(shuffled, openBigPicture);
    setActiveFilter(randomBtn);
  }

  function handleDiscussedClick() {
    const sorted = sortByComments([...currentPhotos]);
    renderThumbnails(sorted, openBigPicture);
    setActiveFilter(discussedBtn);
  }

  // Оборачиваем функции в debounce (500 мс)
  const debouncedRenderDefault = debounce(handleDefaultClick, 500);
  const debouncedRenderRandom = debounce(handleRandomClick, 500);
  const debouncedRenderDiscussed = debounce(handleDiscussedClick, 500);

  // Назначаем обработчики
  defaultBtn.addEventListener('click', debouncedRenderDefault);
  randomBtn.addEventListener('click', debouncedRenderRandom);
  discussedBtn.addEventListener('click', debouncedRenderDiscussed);
}

// Установка активного фильтра
function setActiveFilter(button) {
  document.querySelectorAll('.img-filters__button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
}

// Вспомогательные функции
function shuffleArray(array) {
  for (let i= array.length -1; i >0; i--) {
    const j= Math.floor(Math.random() * (i+1));
    [array[i], array[j]]= [array[j], array[i]];
  }
  return array;
}

function sortByComments(photos) {
  return photos.sort((a,b)=> b.comments.length - a.comments.length);
}

// ===================
// Обработка открытия большого фото и комментариев
// ===================

const bigPictureSection= document.querySelector('.big-picture');
const bigPictureImg= bigPictureSection.querySelector('.big-picture__img img');
const likesCount= bigPictureSection.querySelector('.likes-count');
const socialCaption= bigPictureSection.querySelector('.social__caption');

const closeButton= bigPictureSection.querySelector('.big-picture__cancel');

let currentPhoto= null; // Текущая выбранная фотография

// Обработчик закрытия окна
function closeBigPicture() {
   bigPictureSection.classList.add('hidden');
   document.body.classList.remove('modal-open');

   closeButton.removeEventListener('click', closeBigPicture);
   document.removeEventListener('keydown', onEscKey);

   // Удаляем обработчик "Загрузить еще" для комментариев
   if (loadMoreHandler) {
     document.querySelector('.comments-loader').removeEventListener('click', loadMoreHandler);
     loadMoreHandler= null;
   }
}

// Обработчик нажатия Esc
function onEscKey(evt) {
   if (evt.key === 'Escape' || evt.key === 'Esc') {
     closeBigPicture();
   }
}

// Функция открытия большого фото (вызывается из thumbnails.js)
function openBigPicture(photo) {
   currentPhoto= photo;

   bigPictureSection.classList.remove('hidden');
   document.body.classList.add('modal-open');

   bigPictureImg.src= photo.url;
   bigPictureImg.alt= photo.description;
   likesCount.textContent= photo.likes;
   socialCaption.textContent= photo.description;

   // Очищаем старые комментарии и показываем новые
   clearComments();
   showComments(photo.comments);

   // Назначаем обработчики закрытия окна
   closeButton.addEventListener('click', closeBigPicture);
   document.addEventListener('keydown', onEscKey);

   // Обработчик для кнопки "Загрузить еще"
   loadMoreHandler= () => {
     loadMoreComments();
     updateCommentCounter(photo.comments);
   };

   const loadMoreButton= document.querySelector('.comments-loader');

   // Удаляем старый обработчик (если есть), чтобы избежать дублирования
   loadMoreButton.removeEventListener('click', loadMoreHandler);

   // Добавляем новый обработчик
   loadMoreButton.addEventListener('click', loadMoreHandler);
}

// Обновление счетчика комментариев (если нужно)
function updateCommentCounter(comments) {
   const shownCount= Math.min(currentPhoto.comments.length, getCurrentShownCount());
   const totalCount= comments.length;

   const commentCountText= document.querySelector('.social__comment-count .comments-count');

   if(commentCountText){
     commentCountText.textContent= `${shownCount} из ${totalCount}`;
   }
}

// Получение текущего количества показанных комментариев (используем глобальную переменную)
let getCurrentShownCount = () => window._commentsShownCount ||0;

// ===================
// Внутри модуля comments.js — функции showComments и loadMoreComments обновляют window._commentsShownCount ===================

// Вызовите `openBigPicture` из `renderThumbnails` при клике на миниатюру. Например:

// В файле thumbnails.js или при создании миниатюр:
/// пример:
/// thumbnailElement.addEventListener('click', () => openBigPicture(photo));
