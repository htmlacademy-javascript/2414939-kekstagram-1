import { previewImage, currentScale, updateScale } from 'utils.js';

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');

let currentScale = 100;

function increaseScale() {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
}

function decreaseScale() {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
}

function updateScale() {
  const scaleValue = document.querySelector('.scale__control--value');
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

// Экспортируем функции для использования в основном файле
export { increaseScale, decreaseScale, updateScale, currentScale };

// Инициализация обработчиков
export function initScaleHandlers() {
  smallerBtn.addEventListener('click', decreaseScale);
  biggerBtn.addEventListener('click', increaseScale);
}
