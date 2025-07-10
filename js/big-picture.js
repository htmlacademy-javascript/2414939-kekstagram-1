// bigpicture.js
import { isEscape } from './utils.js'; // функция для проверки на клавишу Escape
import { initializeComments, loadMoreComments } from './comments.js'; // функции для работы с комментариями

// Получение элементов DOM
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const likesCountElem = bigPictureSection.querySelector('.likes-count');
const commentsCountElem = bigPictureSection.querySelector('.comments-count');
const socialCaption = bigPictureSection.querySelector('.social__caption');

const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
const commentsLoaderBtn = bigPictureSection.querySelector('.comments-loader');

let currentPhoto = null;

/**
 * Открывает модальное окно с большим изображением и комментариями.
 * @param {Object} photo - объект фото с данными
 */
function openBigPicture(photo) {
  currentPhoto = photo;

  // Показываем секцию
  bigPictureSection.classList.remove('hidden');

  // Заполняем основные данные
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCountElem.textContent = photo.likes;

  // Инициализация комментариев
  initializeComments(photo);

  // Обновляем описание
  socialCaption.textContent = photo.description;

  // Блокируем прокрутку фона
  document.body.classList.add('modal-open');

  // Назначаем обработчики закрытия
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKey);

  // Обработчик для кнопки "Загрузить еще"
  // Перед добавлением удаляем предыдущий обработчик, чтобы избежать дублирования
  commentsLoaderBtn.removeEventListener('click', onLoadMoreComments);

  // Добавляем обработчик для загрузки дополнительных комментариев
  commentsLoaderBtn.addEventListener('click', onLoadMoreComments);
}

/**
 * Закрывает модальное окно.
 */
function closeBigPicture() {
  // Скрываем секцию
  bigPictureSection.classList.add('hidden');

  // Убираем блокировку прокрутки
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKey);

  // Удаляем обработчик для кнопки "Загрузить еще"
  commentsLoaderBtn.removeEventListener('click', onLoadMoreComments);
}

/**
 * Обработчик нажатия клавиш (Esc)
 * @param {KeyboardEvent} evt
 */
function onEscKey(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

/**
 * Обработчик для кнопки "Загрузить еще"
 */
function onLoadMoreComments() {
  loadMoreComments();

  // Если все комментарии показаны, скрываем кнопку
  const totalCommentsCount = currentPhoto.comments.length;

  const commentsShownCount = window.commentsShownCount; // предполагается, что переменная хранится глобально или в модуле

  if (commentsShownCount >= totalCommentsCount) {
    commentsLoaderBtn.classList.add('hidden');
    // Можно также удалить обработчик, чтобы не было лишних вызовов
    commentsLoaderBtn.removeEventListener('click', onLoadMoreComments);
  }
}

// Экспортируем функцию открытия большого изображения
export { openBigPicture };


// import { isEscape } from './utils.js';

// const bigPictureSection = document.querySelector('.big-picture');
// const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
// const likesCount = bigPictureSection.querySelector('.likes-count');
// const commentsCount = bigPictureSection.querySelector('.comments-count');
// const socialCaption = bigPictureSection.querySelector('.social__caption');
// const socialComments = bigPictureSection.querySelector('.social__comments');
// const commentCountBlock = bigPictureSection.querySelector('.social__comment-count');
// const commentsLoader = bigPictureSection.querySelector('.comments-loader');
// const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
// const socialComment = bigPictureSection.querySelector('.social__comment');
// function createCommentElement(comment) {
//   const cloneSocialComment = socialComment.cloneNode(true);
//   cloneSocialComment.querySelector('.social__picture').src = comment.avatar;
//   cloneSocialComment.querySelector('.social__picture').alt = comment.name;
//   cloneSocialComment.querySelector('.social__text').textContent = comment.message;
//   return cloneSocialComment;
// }

// function clearComments() {
//   socialComments.innerHTML = '';
// }

// function openBigPicture(photo) {
//   bigPictureSection.classList.remove('hidden');

//   bigPictureImg.src = photo.url;
//   bigPictureImg.alt = photo.description;
//   likesCount.textContent = photo.likes;
//   commentsCount.textContent = photo.comments.length;
//   socialCaption.textContent = photo.description;

//   // Скрываем блоки счётчика комментариев и загрузки новых
//   commentCountBlock.classList.add('hidden');
//   commentsLoader.classList.add('hidden');

//   clearComments();

//   photo.comments.forEach((comment) => {
//     const commentEl = createCommentElement(comment);
//     socialComments.appendChild(commentEl);
//   });

//   document.body.classList.add('modal-open');

//   // Обработчики закрытия
//   closeButton.addEventListener('click', closeBigPicture);
//   document.addEventListener('keydown', onEscKey);
// }

// function closeBigPicture() {
//   bigPictureSection.classList.add('hidden');
//   document.body.classList.remove('modal-open');

//   // Удаляем обработчики, чтобы не накапливались
//   closeButton.removeEventListener('click', closeBigPicture);
//   document.removeEventListener('keydown', onEscKey);
// }

// function onEscKey(evt) {
//   if (isEscape(evt)) {
//     evt.preventDefault();
//     closeBigPicture();
//   }
// }

// export { openBigPicture };

// import { isEscape } from './utils.js';

// const bigPictureSection = document.querySelector('.big-picture');
// const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
// const likesCount = bigPictureSection.querySelector('.likes-count');
// const commentsCount = bigPictureSection.querySelector('.comments-count');
// const socialCaption = bigPictureSection.querySelector('.social__caption');
// const socialComments = bigPictureSection.querySelector('.social__comments');
// const commentCountBlock = bigPictureSection.querySelector(
//   '.social__comment-count'
// );
// const commentsLoader = bigPictureSection.querySelector('.comments-loader');
// const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
// const socialCommentTemplate = document.querySelector('.social__comment');

// let currentPhotoComments = [];
// let commentsShownCount = 0;
// const COMMENTS_PER_STEP = 5;

// function createCommentElement(comment) {
//   const cloneSocialComment = socialCommentTemplate.cloneNode(true);
//   cloneSocialComment.querySelector('.social__picture').src = comment.avatar;
//   cloneSocialComment.querySelector('.social__picture').alt = comment.name;
//   cloneSocialComment.querySelector('.social__text').textContent =
//     comment.message;
//   return cloneSocialComment;
// }

// function clearComments() {
//   socialComments.innerHTML = '';
// }

// function renderComments() {
//   socialComments.innerHTML = '';

//   const commentsToShow = currentPhotoComments.slice(0, commentsShownCount);

//   commentsToShow.forEach((comment) => {
//     const commentEl = createCommentElement(comment);
//     socialComments.appendChild(commentEl);
//   });

//   commentCountBlock.classList.remove('hidden');
//   commentCountBlock.querySelector(
//     '.comments-count'
//   ).textContent = `${commentsToShow.length} из ${currentPhotoComments.length}`;

//   if (commentsShownCount >= currentPhotoComments.length) {
//     commentsLoader.classList.add('hidden');
//   } else {
//     commentsLoader.classList.remove('hidden');
//   }
// }

// function openBigPicture(photo) {
//   bigPictureSection.classList.remove('hidden');

//   bigPictureImg.src = photo.url;
//   bigPictureImg.alt = photo.description;
//   likesCount.textContent = photo.likes;

//   currentPhotoComments = photo.comments;
//   commentsShownCount = Math.min(COMMENTS_PER_STEP, currentPhotoComments.length);

//   renderComments();

//   socialCaption.textContent = photo.description;

//   document.body.classList.add('modal-open');

//   closeButton.addEventListener('click', closeBigPicture);
//   document.addEventListener('keydown', onEscKey);
// }

// // Обработчик для кнопки "Загрузить еще"
// commentsLoader.addEventListener('click', () => {
//   commentsShownCount += COMMENTS_PER_STEP;
//   if (commentsShownCount > currentPhotoComments.length) {
//     commentsShownCount = currentPhotoComments.length;
//   }
//   renderComments();
// });

// function closeBigPicture() {
//   bigPictureSection.classList.add('hidden');
//   document.body.classList.remove('modal-open');

//   closeButton.removeEventListener('click', closeBigPicture);
//   document.removeEventListener('keydown', onEscKey);
// }

// function onEscKey(evt) {
//   if (isEscape(evt)) {
//     evt.preventDefault();
//     closeBigPicture();
//   }
// }

// export { openBigPicture };
