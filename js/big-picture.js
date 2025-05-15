const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const likesCount = bigPictureSection.querySelector('.likes-count');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const socialCaption = bigPictureSection.querySelector('.social__caption');
const socialComments = bigPictureSection.querySelector('.social__comments');
const commentCountBlock = bigPictureSection.querySelector('.social__comment-count');
const commentsLoader = bigPictureSection.querySelector('.comments-loader');
const closeButton = bigPictureSection.querySelector('.big-picture__cancel');

function clearComments() {
  socialComments.innerHTML = '';
}

function createCommentElement(comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(p);

  return li;
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
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeBigPicture();
  }
}

export { openBigPicture };
