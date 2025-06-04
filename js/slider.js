import { previewImage } from '/utils.js';

const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level');

import noUiSlider from 'nouislider';

// Объект эффектов
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

let currentEffect = 'none';

function initSlider() {
  noUiSlider.create(effectSliderElement, {
    range: { min:0, max:1 },
    start:1,
    step:0.1,
    connect:'lower'
  });

  effectSliderElement.noUiSlider.on('update', (values) => {
    const value = parseFloat(values[0]);
    document.querySelector('.effect-level__value').value = value;
    updateEffectStyle(value);
  });
}

function applyEffect(effectName) {
  currentEffect = effectName;

  removeAllEffectClasses();

  if (effectName === 'none') {
    previewImage.style.filter = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  previewImage.classList.add(`effects__preview--${effectName}`);

  const {range, step} = EFFECTS[effectName];

  effectSliderElement.noUiSlider.updateOptions({range, start: range.max, step});

  sliderContainer.classList.remove('hidden');
}

function removeAllEffectClasses() {
   previewImage.className = '';
   previewImage.classList.add('img-upload__preview-image');
}

function updateEffectStyle(value) {
   if (currentEffect === 'none') {
     previewImage.style.filter = '';
     return;
   }

   const {filter, unit} } = EFFECTS[currentEffect];
   previewImage.style.filter = `${filter}(${value}${unit})`;
}

// Экспортируем функции для использования в основном файле
export { initSlider, applyEffect };
