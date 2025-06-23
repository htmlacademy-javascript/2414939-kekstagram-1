// forms2.js

import { isEscape } from './utils.js';
import { previewImage, updateScale, DEFAULT_SCALE } from './scale.js';
import { removeAllEffectClasses, sliderContainer, effectSliderElement } from './slider.js';
import { sendDataToServer, blockSubmitButton, unblockSubmitButton, createFormData } from './server.js';

const fileChooser = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const hashtagsInput = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('#upload-select-image');

let currentScale = DEFAULT_SCALE;

const pristineInstance = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

// Валидация хэштегов
function validateHashtags(value) {
  if (!value.trim()) return true;

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const valid = hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const unique = new Set(hashtags).size === hashtags.length;

  return hashtags.length <= 5 && valid && unique;
}

pristineInstance.addValidator(hashtagsInput, validateHashtags, 'Неверный формат хэштегов');

// Обработчик загрузки файла
function onFileSelected() {
  const file = fileChooser.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  showOverlay();
}

// Показывает окно формы
function showOverlay() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

// Скрывает окно формы
function hideOverlay() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  resetForm(); // вызываем сброс формы при закрытии окна
}

// Отправляет форму
async function sendForm(e) {
  e.preventDefault();

  if (pristineInstance.validate()) {
    const formData = createFormData(uploadForm);
    blockSubmitButton(document.querySelector('button[type="submit"]'));

    const isSuccessful = await sendDataToServer(formData);

    if (isSuccessful) {
      console.log('Форма успешно отправлена!');
      hideOverlay();
    } else {
      console.error('Ошибка отправки формы');
    }

    unblockSubmitButton(document.querySelector('button[type="submit"]'));
  } else {
    console.warn('Форма не прошла валидацию');
  }
}

// Сбрасывает форму
function resetForm() {
  uploadForm.reset(); // очищает поля формы
  currentScale = DEFAULT_SCALE; // сбрасывает масштаб
  updateScale(); // обновляет отображаемый масштаб
  previewImage.style.filter = ''; // снимает применяемые фильтры
  removeAllEffectClasses(); // убирает классы эффектов
  sliderContainer.classList.add('hidden'); // прячет контейнер слайдера
  effectSliderElement.noUiSlider.set(effectSliderElement.noUiSlider.options.start); // сбрасывает положение слайдера
}

// Регистрируем обработчики событий
fileChooser.addEventListener('change', onFileSelected);
document.querySelector('#upload-cancel').addEventListener('click', hideOverlay);
uploadForm.addEventListener('submit', sendForm);
document.addEventListener('keydown', (e) => {
  if (isEscape(e)) hideOverlay();
});

export { onFileSelected, showOverlay, hideOverlay, sendForm, resetForm };
