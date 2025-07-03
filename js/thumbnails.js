const picturesContainer = document.querySelector('.pictures');
// const photosContainer = document.querySelector('.photos-container');
const imgUpload = document.querySelector('img-upload');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function renderThumbnails(photos, openBigPicture) {
  // photosContainer.innerHTML = '';
  // picturesContainer.textContent = '';
  imgUpload.style.display = 'block';
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.dataset.id = photo.id;

    pictureElement.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
  // photosContainer.appendChild(pictureElement);
}

export { renderThumbnails };

