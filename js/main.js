// js/main.js

import { generatePhotosData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import './forms.js';

import { showOverlay, hideOverlay } from './form.js';
import { initScaleHandlers } from './scale.js';
import { initSlider, applyEffect } from './slider.js';
import { isEscape } from './utils.js'; // убедитесь, что есть такой файл и функция

// Генерация данных фотографий
const photosData = generatePhotosData();

// Отрисовка миниатюр с возможностью открытия большой картинки
renderThumbnails(photosData, openBigPicture);

// Обработчик открытия окна при выборе файла
const fileChooser = document.querySelector('#upload-file');

fileChooser.addEventListener('change', () => {
  showOverlay();
});

// Обработчик закрытия окна по кнопке отмены
const cancelButton = document.querySelector('#upload-cancel');
cancelButton.addEventListener('click', () => hideOverlay());

// Инициализация масштабирования
initScaleHandlers();

// Инициализация слайдера эффектов
initSlider();

// Назначение обработчика изменения эффекта
document.querySelectorAll('.effects__radio').forEach((radio) => {
  radio.addEventListener('change', () => applyEffect(radio.value));
});

// Инициализация формы
import { initForm } from './form.js';
initForm();

// Обработка нажатия Escape для закрытия окна
document.addEventListener('keydown', (e) => {
  if (isEscape(e)) {
    hideOverlay();
  }
});
