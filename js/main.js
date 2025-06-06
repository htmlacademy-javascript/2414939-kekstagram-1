import { generatePhotosData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { increaseScale, decreaseScale, updateScale } from './scale.js';
import { applyEffect, removeAllEffectClasses, updateEffectStyle } from './slider.js';
import { onFileSelected, showOverlay, hideOverlay, sendForm, resetForm } from './forms.js';

const photosData = generatePhotosData();

renderThumbnails(photosData, openBigPicture);


// Дождаться полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
});
