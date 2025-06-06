import { generatePhotosData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import 'forms.js';


const photosData = generatePhotosData();

renderThumbnails(photosData, openBigPicture);


// Дождаться полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
});
