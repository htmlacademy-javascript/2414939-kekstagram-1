// scale.js
import { isEscape } from './utils.js';

// Глобальные переменные
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');

let currentScale = 100;

// Функция увеличения масштаба
function increaseScale() {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
}

// Функция уменьшения масштаба
function decreaseScale() {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
}

// Обновляет отображаемый масштаб
function updateScale() {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

// Регистрируем обработчики для кнопок масштабирования
smallerBtn.addEventListener('click', decreaseScale);
biggerBtn.addEventListener('click', increaseScale);

export { increaseScale, decreaseScale, updateScale };
