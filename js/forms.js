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

let fileChooser = null;
let overlay = null;
let body = null;
let smallerBtn = null;
let biggerBtn = null;
let scaleValue = null;
let previewImage = null;
let effectsRadios = null;
let sliderContainer = null;
let effectSlider = null;
let effectLevelValue = null;
let hashtagsInput = null;
let descriptionTextArea = null;
let submitButton = null;

let currentScale = 100;
let pristine = null;
let currentEffect = 'none';

// Инициализация
window.addEventListener('load', () => {
  initializeElements();
  setupEvents();
});

// Получение элементов DOM
function initializeElements() {
  fileChooser = document.querySelector('#upload-file');
  overlay = document.querySelector('.img-upload__overlay');
  body = document.body;
  smallerBtn = document.querySelector('.scale__control--smaller');
  biggerBtn = document.querySelector('.scale__control--bigger');
  scaleValue = document.querySelector('.scale__control--value');
  previewImage = document.querySelector('.img-upload__preview > img');
  effectsRadios = document.querySelectorAll('.effects__radio');
  sliderContainer = document.querySelector('.effect-level');
  effectLevelValue = document.querySelector('.effect-level__value');
  hashtagsInput = document.querySelector('.text__hashtags');
  descriptionTextArea = document.querySelector('.text__description');
  submitButton = document.querySelector('#upload-submit');
}

// Навешивание обработчиков
function setupEvents() {
  fileChooser.addEventListener('change', onFileSelected);
  document.querySelector('#upload-cancel').addEventListener('click', hideOverlay);
  smallerBtn.addEventListener('click', decreaseScale);
  biggerBtn.addEventListener('click', increaseScale);
  effectsRadios.forEach(radio => radio.addEventListener('change', applyEffect));
  document.querySelector('#upload-select-image').addEventListener('submit', (e) => sendForm(e));

  setupSlider();
  setupValidation();

  document.addEventListener('keydown', (e) => {
    if (isEscape(e)) {
      hideOverlay();
    }
  });
}

// Показываем окно загрузки
function onFileSelected() {
  showOverlay();
}

// Показать форму
function showOverlay() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

// Скрыть форму
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

  // sliderContainer.classList.add('hidden');
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
  pristine = new Pristine(document.querySelector('#upload-select-image'), {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(hashtagsInput, validateHashtags, 'Неверный формат хэштегов');
}

// Пример простой валидации хэштегов
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
    // Здесь могла бы быть отправка данных на сервер
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
