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

  function initComponents() {} // исправить позже
})();

// Функция для отправки формы
async function handleFormSubmit(formData) {
  const submitButton = document.querySelector('button[type="submit"]');
  blockSubmitButton(submitButton);

  const isSuccess = await sendDataToServer(formData);

  if (isSuccess) {
    showSuccessMessage();
    resetForm();
  } else {
    showErrorMessage();
  }

  unblockSubmitButton(submitButton);
}

// Связывание обработчика отправки формы
const uploadForm = document.querySelector('#upload-select-image');
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = createFormData(uploadForm);
  await handleFormSubmit(formData);
});

// Функция для показа сообщения об успешной отправке
function showSuccessMessage() {
  const successTemplate = document.createElement('div');
  successTemplate.innerHTML = '<p>Фотография успешно отправлена!</p>';
  document.body.appendChild(successTemplate);

  setTimeout(() => {
    document.body.removeChild(successTemplate);
  }, 3000); // автоскрытие сообщения через 3 секунды
}

// Функция для показа сообщения об ошибке
function showErrorMessage() {
  const errorTemplate = document.createElement('div');
  errorTemplate.innerHTML = '<p>Возникла ошибка при отправке фотографии.</p>';
  document.body.appendChild(errorTemplate);

  setTimeout(() => {
    document.body.removeChild(errorTemplate);
  }, 3000); // автоскрытие сообщения через 3 секунды
}
