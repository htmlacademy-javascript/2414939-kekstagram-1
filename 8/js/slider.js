import { isEscape } from './utils.js';

// Константа с предустановленными эффектами
const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: { min: 0, max: 1 },
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: { min: 0, max: 1 },
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: { min: 0, max: 100 },
    step: 1
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: { min: 0, max: 3 },
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: { min: 1, max: 3 },
    step: 0.1
  }
};

// Глобальные переменные
const previewImage = document.querySelector('.img-upload__preview > img');
const effectsRadios = Array.from(document.querySelectorAll('.effects__radio'));
const sliderContainer = document.querySelector('.effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = 'none';

// Инициализация слайдера
if (typeof noUiSlider === 'undefined') {
  throw new Error('NoUiSlider library not found');
}

noUiSlider.create(effectSliderElement, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

effectSliderElement.noUiSlider.on('update', (values) => {
  const value = parseFloat(values[0]);
  effectLevelValue.value = value;
  updateEffectStyle(value);
});

// Функция для установки выбранного эффекта
function applyEffect() {
  const selected = document.querySelector('input[name="effect"]:checked').value;
  currentEffect = selected;

  removeAllEffectClasses();

  if (selected === 'none') {
    previewImage.style.filter = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  previewImage.classList.add(`effects__preview--${selected}`);

  const { range, step } = EFFECTS[selected];

  effectSliderElement.noUiSlider.updateOptions({ range, start: range.max, step });

  sliderContainer.classList.remove('hidden');
}

// Удаляет все классы эффектов
function removeAllEffectClasses() {
  previewImage.className = '';
  previewImage.classList.add('img-upload__preview-image');
}

// Применяет новый эффект на основании значения слайдера
function updateEffectStyle(value) {
  if (currentEffect === 'none') {
    previewImage.style.filter = '';
    return;
  }

  const { filter, unit } = EFFECTS[currentEffect];
  previewImage.style.filter = `${filter}(${value}${unit})`;
}

// Регистрируем обработчики для переключения эффектов
effectsRadios.forEach((radio) => radio.addEventListener('change', applyEffect));

export { applyEffect, removeAllEffectClasses, updateEffectStyle };
