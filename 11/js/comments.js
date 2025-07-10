// import { isEscape } from './utils.js';

const bigPictureSection = document.querySelector('.big-picture');
const socialComments = bigPictureSection.querySelector('.social__comments');
const commentCountBlock = bigPictureSection.querySelector('.social__comment-count');
const commentsLoader = bigPictureSection.querySelector('.comments-loader');
const socialCommentTemplate = document.querySelector('.social__comment');

let currentPhotoComments = [];
let commentsShownCount = 0;
const COMMENTS_PER_STEP = 5;

function createCommentElement(comment) {
  const cloneSocialComment = socialCommentTemplate.cloneNode(true);
  cloneSocialComment.querySelector('.social__picture').src = comment.avatar;
  cloneSocialComment.querySelector('.social__picture').alt = comment.name;
  cloneSocialComment.querySelector('.social__text').textContent =
    comment.message;
  return cloneSocialComment;
}

function clearComments() {
  socialComments.innerHTML = '';
}

function renderComments() {
  socialComments.innerHTML = '';

  const commentsToShow = currentPhotoComments.slice(0, commentsShownCount);

  commentsToShow.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    socialComments.appendChild(commentEl);
  });

  commentCountBlock.classList.remove('hidden');
  commentCountBlock.querySelector(
    '.comments-count'
  ).textContent = `${commentsToShow.length} из ${currentPhotoComments.length}`;

  if (commentsShownCount >= currentPhotoComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function initializeComments(photo) {
  currentPhotoComments = photo.comments;
  commentsShownCount = Math.min(COMMENTS_PER_STEP, currentPhotoComments.length);
  renderComments();
}

function loadMoreComments() {
  commentsShownCount += COMMENTS_PER_STEP;
  if (commentsShownCount > currentPhotoComments.length) {
    commentsShownCount = currentPhotoComments.length;
  }
  renderComments();
}
export { initializeComments, loadMoreComments };

