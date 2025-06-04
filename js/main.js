import { generatePhotosData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import './scale.js';
import './slider.js';
import './form.js';

const photosData = generatePhotosData();

renderThumbnails(photosData, openBigPicture);
