import { loadPhotosFromServer } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { increaseScale, decreaseScale, updateScale } from './scale.js';
import { applyEffect, removeAllEffectClasses, updateEffectStyle } from './slider.js';
import { onFileSelected, showOverlay, hideOverlay, sendForm, resetForm } from './forms.js';
import { sendDataToServer, blockSubmitButton, unblockSubmitButton, createFormData } from './server.js';

const SERVER_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';

(async () => {
  const photosData = await loadPhotosFromServer(SERVER_URL);
  renderThumbnails(photosData, openBigPicture);
})();

