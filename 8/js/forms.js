import { isEscape } from './utils.js';

// Эффекты с параметрами
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

// let fileChooser = null;
// let overlay = null;
// let body = null;
// let smallerBtn = null;
// let biggerBtn = null;
// let scaleValue = null;
// let previewImage = null;
// let effectsRadios = null;
// let sliderContainer = null;
// let effectSlider = null;
// let effectLevelValue = null;
// let hashtagsInput = null;
// let descriptionTextArea = null;
// let submitButton = null;
// let uploadForm = null;

let currentScale = 100;
// let pristine = null;
let currentEffect = 'none';

// Инициализация
// window.addEventListener('load', () => {
//   initializeElements();
//   setupEvents();
// });

// Получение элементов DOM
// function initializeElements() {
const fileChooser = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');
const effectsRadios = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextArea = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');
const uploadForm = document.querySelector('#upload-select-image');
// }

// Навешивание обработчиков
function setupEvents() {
  fileChooser.addEventListener('change', onFileSelected);
  document.querySelector('#upload-cancel').addEventListener('click', hideOverlay);
  smallerBtn.addEventListener('click', decreaseScale);
  biggerBtn.addEventListener('click', increaseScale);
  effectsRadios.forEach((radio) => radio.addEventListener('change', applyEffect));
  // document.querySelector('#upload-select-image').addEventListener('submit', (e) => sendForm(e));
  uploadForm.addEventListener('submit', (e) => sendForm(e));

  setupSlider();
  setupValidation();

  document.addEventListener('keydown', (e) => {
    if (isEscape(e)) {
      hideOverlay();
    }
  });
}

// Отображение окна загрузки
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

// Отображение формы
function showOverlay() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

// Скрытие формы
function hideOverlay() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
}

// Увеличение масштаба
function increaseScale() {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
}

// Уменьшение масштаба
function decreaseScale() {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
}

// Применение масштаба
function updateScale() {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

// Настройка слайдера
function setupSlider() {
  const sliderElement = document.querySelector('.effect-level__slider');
  noUiSlider.create(sliderElement, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower'
  });

  effectSlider = sliderElement;

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    effectLevelValue.value = value;
    updateEffectStyle(value);
  });

}

// Применение эффекта
function applyEffect() {
  const selected = document.querySelector('input[name="effect"]:checked').value;
  currentEffect = selected;

  removeAllEffectClasses();

  if (selected === 'none') {
    previewImage.style.filter = '';
    sliderContainer.classList.add('hidden');
  } else {
    previewImage.classList.add(`effects__preview--${selected}`);
    const { range, step } = EFFECTS[selected];
    effectSlider.noUiSlider.updateOptions({
      range,
      start: range.max,
      step
    });
    sliderContainer.classList.remove('hidden');
  }
}

// Удаление классов эффектов
function removeAllEffectClasses() {
  previewImage.className = '';
  previewImage.classList.add('img-upload__preview-image');
}

// Применение фильтра к изображению
function updateEffectStyle(value) {
  if (currentEffect === 'none') {
    previewImage.style.filter = '';
    return;
  }

  const { filter, unit } = EFFECTS[currentEffect];
  previewImage.style.filter = `${filter}(${value}${unit})`;
}

// Валидация с помощью Pristine
function setupValidation() {
  const  pristine = new Pristine(document.querySelector('#upload-select-image'), {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(hashtagsInput, validateHashtags, 'Неверный формат хэштегов');
}

// Валидация хэштегов
function validateHashtags(value) {
  if (!value) return true;

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const valid = hashtags.every(tag => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const unique = new Set(hashtags).size === hashtags.length;
  return hashtags.length <= 5 && valid && unique;
}

// Отправка формы
function sendForm(event) {
  event.preventDefault();
  if (pristine.validate()) {
    console.log('Форма прошла валидацию и готова к отправке!');
    hideOverlay();
  } else {
    console.warn('Форма не прошла валидацию');
  }
}

// Сброс формы
function resetForm() {
  document.querySelector('#upload-select-image').reset();
  currentScale = 100;
  updateScale();
  previewImage.style.filter = '';
  removeAllEffectClasses();
  sliderContainer.classList.add('hidden');
  effectSlider.noUiSlider.set(100);
}
