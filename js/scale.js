// scale.js
import { isEscape } from './utils.js';

// Объект состояния масштаба
export const scaleState = {
  currentScale: 100,
};

// DOM элементы
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');

// Функция обновления отображения масштаба
function updateScale() {
  scaleValue.value = `${scaleState.currentScale}%`;
  previewImage.style.transform = `scale(${scaleState.currentScale / 100})`;
}

// Функция увеличения масштаба
function increaseScale() {
  if (scaleState.currentScale < 100) {
    scaleState.currentScale += 25;
    updateScale();
  }
}

// Функция уменьшения масштаба
function decreaseScale() {
  if (scaleState.currentScale > 25) {
    scaleState.currentScale -= 25;
    updateScale();
  }
}

// Регистрация обработчиков кнопок
smallerBtn.addEventListener('click', decreaseScale);
biggerBtn.addEventListener('click', increaseScale);

// Инициализация начального отображения
updateScale();

export { increaseScale, decreaseScale, updateScale};
