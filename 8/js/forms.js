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

let currentScale = 100;
let currentEffect = 'none';

const fileChooser = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const previewImage = document.querySelector('.img-upload__preview img');

const effectsRadios = document.querySelectorAll('.effects__radio');

const sliderContainer = document.querySelector('.effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextArea = document.querySelector('.text__description');

const uploadForm = document.querySelector('#upload-select-image');
const submitButton = document.querySelector('#upload-submit');

let pristine = null;
let effectSlider = null;

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
  setupElements();
  setupEvents();
});

// Инициализация элементов DOM
function setupElements() {
  // Все переменные объявлены const выше
}

// Навешивание обработчиков событий
function setupEvents() {

  // Обработка выбора файла
  fileChooser.addEventListener('change', onFileSelected);

   // Обработка закрытия окна (например, по кнопке отмены)
   const cancelButton= document.querySelector('#upload-cancel');
   if (cancelButton) {
     cancelButton.addEventListener('click', hideOverlay);
   }

   // Масштабирование
   smallerBtn.addEventListener('click', decreaseScale);
   biggerBtn.addEventListener('click', increaseScale);

   // Выбор эффекта
   effectsRadios.forEach((radio) => radio.addEventListener('change', applyEffect));

   // Отправка формы
   uploadForm.addEventListener('submit', (e) => sendForm(e));

   // Настройка слайдера уровня эффекта с помощью noUiSlider
   setupSlider();

   // Валидация хэштегов (используя Pristine или другую библиотеку)
   setupValidation();

   // Обработка нажатия клавиш для закрытия окна по Escape
   document.addEventListener('keydown', (e) => {
     if (isEscape(e)) {
       hideOverlay();
     }
   });
}

// Обработка выбора файла и отображение предварительного просмотра
function onFileSelected() {
 if (fileChooser.files.length === 0) return;

 const file = fileChooser.files[0];
 const reader= new FileReader();

 reader.onloadend= () => {
   previewImage.src= reader.result;
 };

 reader.readAsDataURL(file);
 showOverlay();
}

// Показать окно загрузки/редактирования изображения
function showOverlay() {
 overlay.classList.remove('hidden');
 document.body.classList.add('modal-open');
}

// Скрыть окно и сбросить форму и настройки эффектов/масштаба
function hideOverlay() {
 overlay.classList.add('hidden');
 document.body.classList.remove('modal-open');
 resetForm();
}

// Увеличить масштаб изображения (например, на шаг +25%)
function increaseScale() {
 if (currentScale <100) {
   currentScale +=25;
   updateScale();
 }
}

// Уменьшить масштаб изображения (на шаг -25%)
function decreaseScale() {
 if (currentScale >25) {
   currentScale -=25;
   updateScale();
 }
}

// Обновление масштаба изображения и отображения значения
function updateScale() {
 scaleValue.value= `${currentScale}%`;
 previewImage.style.transform= `scale(${currentScale/100})`;
}

// Настройка слайдера уровня эффекта с помощью noUiSlider
function setupSlider() {
 const slider= effectSliderElement;

 noUiSlider.create(slider, {
   range:{ min:EFFECTS['chrome'].range.min, max:EFFECTS['chrome'].range.max },
   start:EFFECTS['chrome'].range.max,
   step:EFFECTS['chrome'].step,
   connect:'lower'
 });

 effectSlider= slider;

 slider.noUiSlider.on('update', () => {
   const value= slider.noUiSlider.get();
   effectLevelValue.value= value;
   updateEffectStyle(value);
 });
}

// Обработка выбора эффекта радиокнопками
function applyEffect() {
 const selectedRadio= document.querySelector('input[name="effect"]:checked');
 if (!selectedRadio) return;

 const selected= selectedRadio.value;

 currentEffect= selected;

 removeAllEffectClasses();

 if (selected === 'none') {
   previewImage.style.filter= '';
   sliderContainer.classList.add('hidden');
 } else {

}

 // Обновление стиля фильтра по уровню эффекта
function updateEffectStyle(value) {
 if (currentEffect === 'none') {
     previewImage.style.filter= '';
     return;
 }

 const { filter, unit }= EFFECTS[currentEffect];
 previewImage.style.filter= `${filter}(${value}${unit})`;
}

// Удаление всех классов эффектов у изображения перед применением нового эффекта или сброса.
function removeAllEffectClasses() {
 previewImage.className= '';
 previewImage.classList.add('img-upload__preview'); // или другой базовый класс вашего изображения.
}

// Настройка валидации хэштегов с помощью Pristine или другой библиотеки.
function setupValidation() {
 pristine= new Pristine(uploadForm,{
     classTo:'img-upload__field-wrapper',
     errorClass:'img-upload__field-wrapper--error',
     errorTextParent:'img-upload__field-wrapper'
 });

 pristine.addValidator(hashtagsInput, validateHashtags,'Неверный формат хэштегов');
}

// Валидация хэштегов по формату и уникальности.
function validateHashtags(value) {
 if (!value) return true;

 const hashtags= value.toLowerCase().trim().split(/\s+/);
 const valid= hashtags.every(tag=> /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
 const unique= new Set(hashtags).size===hashtags.length;

 return hashtags.length<=5 && valid && unique;
}

// Отправка формы после валидации.
function sendForm(event) {
 event.preventDefault();

 if(pristine.validate()){

 console.log('Форма прошла валидацию и готова к отправке!');
 hideOverlay();

 } else{
 console.warn('Форма не прошла валидацию');
 }
}

// Сброс формы и настроек после закрытия.
function resetForm() {

 uploadForm.reset();

 currentScale=100;

 updateScale();

 previewImage.style.filter='';

 removeAllEffectClasses();

 sliderContainer.classList.add('hidden');

 if(effectSlider && effectSlider.noUiSlider){
     effectSlider.noUiSlider.set(100);
 }

}
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
let uploadForm = null;

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
  uploadForm = document.querySelector('#upload-select-image');
}

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
  pristine = new Pristine(document.querySelector('#upload-select-image'), {
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
