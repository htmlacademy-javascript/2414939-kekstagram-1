import { generatePhotosData } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function renderThumbnails() {
  const photos = generatePhotosData();
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}

export { renderThumbnails };
