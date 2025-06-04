// forms.js
import { scaleState } from './scale.js';

// Предположим, у вас есть форма и функция сброса формы
const uploadForm = document.querySelector('.img-upload__form');

function resetForm() {
  uploadForm.reset();

  // Сброс масштаба через изменение состояния и обновление отображения
  scaleState.currentScale = 100;
  // Вызов функции обновления масштаба из scale.js
  // Для этого нужно импортировать функцию updateScale()
}

import { updateScale } from './scale.js';

function onReset() {
  resetForm();
}

// Например, при закрытии модального окна или по событию сброса формы:
document.querySelector('.some-reset-button').addEventListener('click', onReset);

// Или вызовите resetForm() в нужный момент
