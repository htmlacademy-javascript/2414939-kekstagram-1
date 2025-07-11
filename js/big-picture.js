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
