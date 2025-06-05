import { isEscape } from './utils.js';
import { previewImage } from './scale.js';
import { scaleState } from './scale.js';
import { updateScale } from './scale.js';
import { removeAllEffectClasses} from './slider.js';
import {sliderContainer} from './slider.js';
import {effectLevelValue} from './slider.js';
import {effectSliderElement} from './slider.js';

const fileChooser = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextArea = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');
const uploadForm = document.querySelector('#upload-select-image');

let currentScale = 100;
let currentEffect = 'none';
let pristineInstance = null;

// Валидация хэштегов
function validateHashtags(value) {
  if (!value.trim()) return true;

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const valid = hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const unique = new Set(hashtags).size === hashtags.length;

  return hashtags.length <= 5 && valid && unique;
}

// Настройка валидации формы
function setupValidation() {
  pristineInstance = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper'
  });

  pristineInstance.addValidator(hashtagsInput, validateHashtags, 'Неверный формат хэштегов');
}

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

  resetForm();
}

// Отправляет форму
function sendForm(e) {
  e.preventDefault();

  if (pristineInstance.validate()) {
    console.log('Форма прошла валидацию и готова к отправке!');

    hideOverlay();
  } else {
    console.warn('Форма не прошла валидацию');
  }
}

// Сбрасывает форму
function resetForm() {
  uploadForm.reset();
  currentScale = 100;
  updateScale();
  previewImage.style.filter = '';
  removeAllEffectClasses();
  sliderContainer.classList.add('hidden');

  // Возвращаем слайдер к начальному значению
  effectSliderElement.noUiSlider.set(effectSliderElement.noUiSlider.options.start);
}

// Регистрируем обработчики событий
fileChooser.addEventListener('change', onFileSelected);
document.querySelector('#upload-cancel').addEventListener('click', hideOverlay);
uploadForm.addEventListener('submit', sendForm);
document.addEventListener('keydown', (e) => {
  if (isEscape(e)) hideOverlay();
});

setupValidation();

export { onFileSelected, showOverlay, hideOverlay, sendForm, resetForm };
