// main.js

import { loadPhotosFromServer } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { increaseScale, decreaseScale, updateScale } from './scale.js';
import { applyEffect, removeAllEffectClasses, updateEffectStyle } from './slider.js';
import { onFileSelected, showOverlay, hideOverlay, sendForm, resetForm } from './forms.js';
import { sendDataToServer, blockSubmitButton, unblockSubmitButton, createFormData } from './server.js';

const DATA_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';

// Основной асинхронный блок для загрузки данных с сервера
(async () => {
  try {
    const photosData = await loadPhotosFromServer(DATA_URL);
    if (photosData) {
      renderThumbnails(photosData, openBigPicture);
    } else {
      console.error('Не удалось загрузить данные с сервера');
    }
  } catch (error) {
    console.error('Произошла ошибка при загрузке данных:', error);
  }

  // Инициализация компонента формы (необходимо развернуть логику)
  initComponents();

  function initComponents() {}
})();

// Функция для отправки формы
async function handleFormSubmit(formData) {
  const submitButton = document.querySelector('button[type="submit"]'); // убедитесь, что кнопка найдена
  blockSubmitButton(submitButton); // передайте реальную кнопку

  const isSuccess = await sendDataToServer(formData);

  if (isSuccess) {
    resetForm();
    hideOverlay();
  } else {
    console.error('Ошибка отправки формы');
  }

  unblockSubmitButton(submitButton); // разблокируем кнопку
}

// Регистрируем обработчик отправки формы
const uploadForm = document.querySelector('#upload-select-image');
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = createFormData(uploadForm);
  await handleFormSubmit(formData);
});
