const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const likesCount = bigPictureSection.querySelector('.likes-count');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const socialCaption = bigPictureSection.querySelector('.social__caption');
const socialComments = bigPictureSection.querySelector('.social__comments');
const commentCountBlock = bigPictureSection.querySelector('.social__comment-count');
const commentsLoader = bigPictureSection.querySelector('.comments-loader');
const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
import { isEscape } from './utils.js';

function clearComments() {
  socialComments.innerHTML = '';
}

const socialComment = bigPictureSection.querySelector('.social__comment'); // находим li
function createCommentElement(comment) {
  const cloneSocialComment = socialComment.cloneNode(true);
  cloneSocialComment.querySelector('.social__picture').src = comment.avatar;
  cloneSocialComment.querySelector('.social__picture').alt = comment.name;
  cloneSocialComment.querySelector('.social__text').textContent = comment.message;
  return cloneSocialComment;
}

function openBigPicture(photo) {
  bigPictureSection.classList.remove('hidden');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Скрываем блоки счётчика комментариев и загрузки новых
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  clearComments();

  photo.comments.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    socialComments.appendChild(commentEl);
  });

  document.body.classList.add('modal-open');

  // Обработчики закрытия
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKey);
}

function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики, чтобы не накапливались
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKey);
}

function onEscKey(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export { openBigPicture };
