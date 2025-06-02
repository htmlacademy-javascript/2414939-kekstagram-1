import { isEscape } from './utils.js';

// Переменные для элементов
let uploadForm = null;
let pristine = null;
let overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const closeButton = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelSliderContainer = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadioButtons = document.querySelectorAll('.effects__radio');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');

let effectSlider; // переменная для noUiSlider

// Инициализация элементов и Pristine
function initializeElements() {
  uploadForm = document.querySelector('#upload-select-image');

  // Инициализация Pristine
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper'
  });
}

// Открытие оверлея
function showOverlay() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Обработчики закрытия по Escape
  document.addEventListener('keydown', onDocumentKeyDown);
}

// Скрытие оверлея
function hideOverlay() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Очистка формы и сброс эффектов
  resetForm();

  // Удаление обработчиков
  document.removeEventListener('keydown', onDocumentKeyDown);
}

// Обработчик нажатия клавиш для закрытия по Escape
function onDocumentKeyDown(evt) {
  if (isEscape(evt)) {
    hideOverlay();
  }
}

// Обработка выбора файла (открытие)
fileInput.addEventListener('change', () => {
  showOverlay();
});

// Обработка закрытия формы
closeButton.addEventListener('click', () => {
  hideOverlay();
});

// Обработка отправки формы
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (pristine.validate()) {
    console.log('Форма прошла валидацию и готова к отправке!');
    hideOverlay();
    // Тут можно добавить реальную отправку данных
  } else {
    console.warn('Форма не прошла валидацию');
  }
});

// Функция сброса формы и эффектов
function resetForm() {
  uploadForm.reset();

  // Сброс эффектов и стилей изображения
  removeAllEffectClasses();

  previewImage.style.transform = '';

  // Сброс масштаба
  scaleValueInput.value = '100%';

  // Удаление слайдера эффекта, если есть
  if (effectSlider) {
    effectSlider.noUiSlider.destroy();
    effectSlider = null;
    effectLevelSliderContainer.style.display = 'none';
    effectLevelValue.value = '';
  }
}

// Удаление всех классов эффектов
function removeAllEffectClasses() {
  previewImage.className = 'img-upload__preview-img'; // или другой базовый класс, если есть
}

// Обработка выбора эффекта радиокнопками
effectsRadioButtons.forEach((radio) => {
  radio.addEventListener('change', () => {
    const selectedEffect = radio.value;

    removeAllEffectClasses();

    if (selectedEffect !== 'none') {
      previewImage.classList.add(`effects__preview--${selectedEffect}`);

      const { range, step } = EFFECTS[selectedEffect];

      // Создаем или обновляем слайдер эффекта
      if (!effectSlider) {
        effectLevelSliderContainer.style.display = 'block';
        effectSlider = noUiSlider.create(effectLevelSliderContainer, {
          range,
          start: range.max,
          step,
          connect: 'lower'
        });

        effectSlider.on('update', () => {
          const value = effectSlider.get();
          effectLevelValue.value = value;

          // Применяем эффект к изображению (пример)
          previewImage.style.filter = getFilterString(selectedEffect, value);
        });
      } else {
        effectSlider.noUiSlider.updateOptions({ range, start: range.max, step });
        effectLevelValue.value = range.max;
        previewImage.style.filter = getFilterString(selectedEffect, range.max);
      }

    } else {
      // Если выбран эффект "none"
      if (effectSlider) {
        effectSlider.noUiSlider.destroy();
        effectSlider = null;
      }
      effectLevelSliderContainer.style.display = 'none';
      previewImage.style.filter = '';
    }

    // Обновляем класс изображения для эффекта (если нужно)

  });
});

// Функция получения CSS фильтра по эффекту и значению
function getFilterString(effectName, value) {
  switch (effectName) {
    case 'chrome':
      return `grayscale(${value})`;
    case 'sepia':
      return `sepia(${value})`;
    case 'marvin':
      return `invert(${value}%)`;
    case 'phobos':
      return `blur(${value}px)`;
    case 'heat':
      return `brightness(${value})`;
    default:
      return '';
  }
}

// Константы эффектов с диапазонами и шагами
const EFFECTS = {
  chrome: { range: { min:0, max:1 }, step:0.1 },
  sepia: { range: { min:0, max:1 }, step:0.1 },
  marvin: { range: { min:0, max:100 }, step:1 },
  phobos: { range: { min:0, max:3 }, step:0.1 },
  heat: { range: { min:1, max:3 }, step:0.1 }
};

// Масштабирование изображения
scaleControlSmaller.addEventListener('click', () => {
  let currentScalePercent = parseInt(scaleValueInput.value);

  if (currentScalePercent >10) {
    currentScalePercent -=10;
    scaleValueInput.value= `${currentScalePercent}%`;

    previewImage.style.transform= `scale(${currentScalePercent/100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentScalePercent= parseInt(scaleValueInput.value);

  if(currentScalePercent<100){
    currentScalePercent+=10;
    scaleValueInput.value= `${currentScalePercent}%`;

    previewImage.style.transform= `scale(${currentScalePercent/100})`;
   }
});

// Инициализация при загрузке страницы
initializeElements();

