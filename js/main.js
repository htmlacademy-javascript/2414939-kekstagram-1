import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { hideOverlay, resetForm } from './forms.js';
import { sendDataToServer, blockSubmitButton, unblockSubmitButton, createFormData,loadPhotosFromServer} from './server.js';

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

// // Функция для отправки формы
// async function handleFormSubmit(formData) {
//   const submitButton = document.querySelector('button[type="submit"]');
//   blockSubmitButton(submitButton);

//   const isSuccess = await sendDataToServer(formData);

//   if (isSuccess) {
//     resetForm();
//     hideOverlay();
//   }
//   // else {}

//   unblockSubmitButton(submitButton);
// }

// Регистрирует обработчик отправки формы
const uploadForm = document.querySelector('#upload-select-image');
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = createFormData(uploadForm);
  await handleFormSubmit(formData);
});
