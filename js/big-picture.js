
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const likesCount = bigPictureSection.querySelector('.likes-count');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const socialCaption = bigPictureSection.querySelector('.social__caption');
const socialComments = bigPictureSection.querySelector('.social__comments');
const commentCountBlock = bigPictureSection.querySelector('.social__comment-count');
const commentsLoader = bigPictureSection.querySelector('.comments-loader');
const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
const socialCommentTemplate = bigPictureSection.querySelector('.social__comment');


import { isEscape } from './util.js';

function clearComments() {
  socialComments.innerHTML = '';
}

function createCommentElement(comment) {
  const cloneSocialComment = socialCommentTemplate.cloneNode(true);
  cloneSocialComment.querySelector('.social__picture').src = comment.avatar;
  cloneSocialComment.querySelector('.social__picture').alt = comment.name;
  cloneSocialComment.querySelector('.social__text').textContent = comment.message;
  return cloneSocialComment;
}

function openBigPicture(photo) {
  let keyDownHandler = null;

  bigPictureSection.classList.remove('hidden');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  clearComments();

  photo.comments.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    socialComments.appendChild(commentEl);
  });

  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closeBigPicture);

  keyDownHandler = (event) => {
    if (isEscape(event)) {
      event.preventDefault();
      closeBigPicture();
    }
  };

  document.addEventListener('keydown', keyDownHandler);
}

function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);

  if (typeof keyDownHandler !== 'undefined') {
    document.removeEventListener('keydown', keyDownHandler);
  }
}

export { openBigPicture };
