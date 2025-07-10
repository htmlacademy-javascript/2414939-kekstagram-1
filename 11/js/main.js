import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { loadPhotosFromServer } from './server.js';
import { setupFilters } from './filters.js';
import './forms.js';

const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

let currentPhotos = [];


loadPhotosFromServer()
  .then((photos) => {
    currentPhotos = photos;

    renderThumbnails(currentPhotos, openBigPicture);

    setupFilters(currentPhotos, renderThumbnails, openBigPicture);
  });

