import { isEscape } from './utils.js';
import { initScaleHandlers } from './scale.js';
import { initSlider, applyEffect } from './slider.js';

const uploadForm = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextArea = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

import Pristine from 'pristinejs'; // убедитесь что подключена библиотека

// Валидация хэштегов
function validateHashtags(value) {
  if (!value.trim()) return true;

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const validTags = hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const uniqueTagsCount = new Set(hashtags).size === hashtags.length;

  return hashtags.length <=5 && validTags && uniqueTagsCount;
}

// Инициализация Pristine
const pristineInstance = new Pristine(uploadForm,{
  classTo:'img-upload__field-wrapper',
  errorClass:'img-upload__field-wrapper--error',
  errorTextParent:'img-upload__field-wrapper'
});

pristineInstance.addValidator(hashtagsInput, validateHashtags,'Неверный формат хэштегов');

// Обработка отправки формы
function sendForm(e) {
  e.preventDefault();

  if (pristineInstance.validate()) {
    console.log('Форма прошла валидацию и готова к отправке!');
    // Тут можно добавить отправку данных на сервер или другую логику
  } else{
    console.warn('Форма не прошла валидацию');
  }
}

// Обработчики событий формы
export function initFormHandlers() {
  uploadForm.addEventListener('submit', sendForm);
}

// Экспортируем функцию для открытия и закрытия overlay (если нужно)
export function showOverlay() {
  const overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export function hideOverlay() {
  const overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.reset();
}

// Инициализация всего модуля формы
export function initForm() {
  initFormHandlers();
}
