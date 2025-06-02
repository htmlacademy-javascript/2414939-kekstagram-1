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

// Объявляем переменные глобально внутри модуля
const fileChooser = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');
const effectsRadios = Array.from(document.querySelectorAll('.effects__radio'));
const sliderContainer = document.querySelector('.effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextArea = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');
const uploadForm = document.querySelector('#upload-select-image');

let currentScale = 100;
let currentEffect = 'none';
let pristineInstance = null;

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

// Обработчики событий
fileChooser.addEventListener('change', onFileSelected);
document.querySelector('#upload-cancel').addEventListener('click', hideOverlay);
smallerBtn.addEventListener('click', decreaseScale);
biggerBtn.addEventListener('click', increaseScale);
effectsRadios.forEach((radio) => radio.addEventListener('change', applyEffect));
uploadForm.addEventListener('submit', sendForm);
document.addEventListener('keydown', (e) => {
  if (isEscape(e)) hideOverlay();
});

// Функции

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

function showOverlay() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function hideOverlay() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  resetForm();
}

function increaseScale() {
  if(currentScale < 100){
    currentScale += 25;
    updateScale();
  }
}

function decreaseScale() {
  if(currentScale > 25){
    currentScale -= 25;
    updateScale();
  }
}

function updateScale() {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

function applyEffect() {
  const selected = document.querySelector('input[name="effect"]:checked').value;
  currentEffect = selected;

  removeAllEffectClasses();

  if(selected === 'none') {
    previewImage.style.filter = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  previewImage.classList.add(`effects__preview--${selected}`);

  const {range, step} = EFFECTS[selected];

  effectSliderElement.noUiSlider.updateOptions({range, start: range.max, step});

  sliderContainer.classList.remove('hidden');
}

function removeAllEffectClasses() {
  previewImage.className = '';
  previewImage.classList.add('img-upload__preview-image');
}

function updateEffectStyle(value) {
  if(currentEffect === 'none') {
    previewImage.style.filter = '';
    return;
  }

  const {filter, unit} = EFFECTS[currentEffect];
  previewImage.style.filter = `${filter}(${value}${unit})`;
}

// Валидация
function setupValidation() {
  pristineInstance = new Pristine(uploadForm,{
    classTo:'img-upload__field-wrapper',
    errorTextParent:'img-upload__field-wrapper',
    errorTextClass:'img-upload__error'
  });

  pristineInstance.addValidator(
    hashtagsInput,
    validateHashtags,
    'Неверный формат хэштегов'
  );
}

// Валидация хэштегов
function validateHashtags(value) {
  if(!value.trim()) return true;

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const valid = hashtags.every((tag)=> /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const unique = new Set(hashtags).size === hashtags.length;

  return hashtags.length <= 5 && valid && unique;
}

// Отправка формы
function sendForm(e) {
  e.preventDefault();

  if(pristineInstance.validate()) {
    console.log('Форма прошла валидацию и готова к отправке!');

    hideOverlay();
  } else{
   console.warn('Форма не прошла валидацию');
  }
}

// Сброс формы
function resetForm() {
  uploadForm.reset();
  currentScale = 100;
  updateScale();
  previewImage.style.filter = '';
  removeAllEffectClasses();
  sliderContainer.classList.add('hidden');

  // Возвращаем слайдер к начальному значению
  effectSliderElement.noUiSlider.set(effectSliderElement.noUiSlider.options.start);
}
