import { loadPhotosFromServer } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { increaseScale, decreaseScale, updateScale } from './scale.js';
import { applyEffect, removeAllEffectClasses, updateEffectStyle } from './slider.js';
import { onFileSelected, showOverlay, hideOverlay, sendForm, resetForm } from './forms.js';
import { sendDataToServer, blockSubmitButton, unblockSubmitButton, createFormData } from './server.js';

const DATA_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';

(async () => {
  try {
    // Загружает данные с сервера
    const photosData = await loadPhotosFromServer(DATA_URL);

    if (photosData) {
      // Рендерит миниатюры
      renderThumbnails(photosData, openBigPicture);
    } else {
      console.error('Не удалось загрузить данные с сервера');
    }
  } catch (error) {
    console.error('Произошла ошибка при загрузке данных:', error);
  }

  // Инициализация других компонентов
  initComponents();

  function initComponents() {
  }
})();

// Функция для отправки формы
async function handleFormSubmit(formData) {
  blockSubmitButton();

  const isSuccess = await sendDataToServer(formData);

  if (isSuccess) {
    showSuccessMessage();
    resetForm();
  } else {
    showErrorMessage();
  }

  unblockSubmitButton();
}

// Показывает сообщение об успешной отправке
function showSuccessMessage() {
}

// Показывает сообщение об ошибке
function showErrorMessage() {
}
