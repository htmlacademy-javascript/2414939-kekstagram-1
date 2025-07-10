import { isEscape } from './utils.js';
import { initializeComments, loadMoreComments } from './comments.js';


const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const likesCountElem = bigPictureSection.querySelector('.likes-count');
// const commentsCountElem = bigPictureSection.querySelector('.comments-count');
const socialCaption = bigPictureSection.querySelector('.social__caption');

const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
const commentsLoaderBtn = bigPictureSection.querySelector('.comments-loader');

let currentPhoto = null;


function openBigPicture(photo) {
  currentPhoto = photo;


  bigPictureSection.classList.remove('hidden');


  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCountElem.textContent = photo.likes;


  initializeComments(photo);


  socialCaption.textContent = photo.description;


  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKey);

  commentsLoaderBtn.removeEventListener('click', onLoadMoreComments);

  commentsLoaderBtn.addEventListener('click', onLoadMoreComments);
}


function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKey);

  commentsLoaderBtn.removeEventListener('click', onLoadMoreComments);
}

function onEscKey(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onLoadMoreComments() {
  loadMoreComments();

  const totalCommentsCount = currentPhoto.comments.length;

  const commentsShownCount = window.commentsShownCount; // предполагается, что переменная хранится глобально или в модуле

  if (commentsShownCount >= totalCommentsCount) {
    commentsLoaderBtn.classList.add('hidden');
    commentsLoaderBtn.removeEventListener('click', onLoadMoreComments);
  }
}

export { openBigPicture };

