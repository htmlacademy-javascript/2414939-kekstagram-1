
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { hideOverlay, resetForm, blockSubmitButton, unblockSubmitButton, showOverlay} from './forms.js';
import { sendDataToServer, createFormData,loadPhotosFromServer} from './server.js';

const DATA_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';

// Основной асинхронный блок для загрузки данных с сервера2
(async () => {
  try {
    const photosData = await loadPhotosFromServer(DATA_URL);
    if (photosData) {
      renderThumbnails(photosData, openBigPicture);
    }
    // else {}
  } catch (error) {}

  initComponents();

  function initComponents() {}
})();

