import { isEscape } from './utils.js';

// Обертка кода в IIFE для изоляции переменных
(() => {
  // Глобальные переменные для работы с элементами формы
  let fileChooser = null;
  let overlay = null;
  let body = null;
  let smallerBtn = null;
  let biggerBtn = null;
  let scaleValue = null;
  let previewImage = null;
  let effectsRadios = null;
  let sliderContainer = null;
  let effectLevelValue = null;
  let imagePreview = null;
  let hashtagsInput = null;
  let descriptionTextArea = null;
  let submitButton = null;

  // Текущий масштаб изображения
  let currentScale = 100;

  // Экземпляр Pristine для валидации формы
  let pristine = null;

  // Начало работы после полной подготовки страницы
  window.addEventListener('load', () => {
    initializeElements();
    setupEvents();
  });

  // Определение ссылок на элементы формы
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
    imagePreview = document.querySelector('.img-upload__preview > img');
    hashtagsInput = document.querySelector('.text__hashtags');
    descriptionTextArea = document.querySelector('.text__description');
    submitButton = document.querySelector('#upload-submit');
  }

  // Устанавка обработчиков событий
  function setupEvents() {
    // Открытие формы редактирования
    fileChooser.addEventListener('change', onFileSelected);

    // Закрытие формы
    const closeButton = document.querySelector('#upload-cancel');
    closeButton.addEventListener('click', hideOverlay);

    // Масштабирование изображения
    smallerBtn.addEventListener('click', decreaseScale);
    biggerBtn.addEventListener('click', increaseScale);

    // Выбор эффекта
    effectsRadios.forEach((radio) => radio.addEventListener('change', applyEffect));

    // Настройка слайдера
    configureSlider();

    // Валидация и отправка формы
    setUpPristineValidation();
    document.querySelector('#upload-select-image').addEventListener('submit', (event) => {
      sendForm(event, pristine);
    });
  }

  // Обработчик выбора файла
  function onFileSelected() {
    showOverlay();
  }

  // Отображение формы редактирования
  function showOverlay() {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }

  // Скрытие формы редактирования
  function hideOverlay() {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }

  // Увеличение масштаба изображения
  function increaseScale() {
    if (currentScale <= 100 - 25) {
      currentScale += 25;
      updateScale(currentScale);
    }
  }

  // Уменьшение масштаба изображения
  function decreaseScale() {
    if (currentScale >= 25 + 25) {
      currentScale -= 25;
      updateScale(currentScale);
    }
  }

  // Обновление значения масштаба и визуальное изменение изображения
  function updateScale(newScale) {
    scaleValue.value = `${newScale}%`;
    previewImage.style.transform = `scale(${newScale / 100})`;
  }

  // Применение выбранного эффекта
  function applyEffect() {
    const selectedRadio = document.querySelector('input[name="effect"]:checked');
    if (selectedRadio) {
      const effectType = selectedRadio.value;
      removeCurrentEffects();
      if (effectType !== 'none') {
        imagePreview.classList.add(`effects__preview--${effectType}`);
        sliderContainer.classList.remove('hidden');
      } else {
        sliderContainer.classList.add('hidden');
      }
    }
  }

  // Удаление предыдущего эффекта
  function removeCurrentEffects() {
    imagePreview.className = imagePreview.className.split(' ')
      .filter((className) => !className.startsWith('effects__preview'))
      .join(' ');
  }

  // Конфигурация слайдера
  function configureSlider() {
    const sliderOptions = {
      start: [1],
      connect: true,
      range: {
        min: 0,
        max: 1
      },
      format: {
        to: function(value) {
          return Math.round(value * 100);
        },
        from: function(value) {
          return Number(value) / 100;
        }
      }
    };

    noUiSlider.create(effectLevelValue, sliderOptions);

    // Обновление изображения при движении слайдером
    effectLevelValue.noUiSlider.on('update', (values) => {
      const level = values[0];
      applyFilterBasedOnEffect(level);
    });
  }

  // Применение фильтра в зависимости от выбранного эффекта
  function applyFilterBasedOnEffect(level) {
    const selectedRadio = document.querySelector('input[name="effect"]:checked');
    if (selectedRadio) {
      const effectType = selectedRadio.value;
      switch (effectType) {
        case 'chrome': imagePreview.style.filter = `grayscale(${level})`; break;
        case 'sepia': imagePreview.style.filter = `sepia(${level})`; break;
        case 'marvin': imagePreview.style.filter = `invert(${Math.round(level * 100)}%)`; break;
        case 'phobos': imagePreview.style.filter = `blur(${level * 3}px)`; break;
        case 'heat': imagePreview.style.filter = `brightness(${1 + level * 2})`; break;
        default: imagePreview.style.filter = '';
      }
    }
  }

  // Настройка валидации формы
  function setUpPristineValidation() {
    pristine = new Pristine(document.forms['upload-select-image'], {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'validation-error'
    });

    // Ограничения на хэш-теги
    pristine.addValidator(hashtagsInput, (value) => {
      const tags = value.trim().split(/\s+/).map((tag) => tag.toLowerCase());
      return (
        tags.every((tag) =>
          /^#[a-z\d]+$/.test(tag) && tag.length <= 20 &&
          !(tags.slice(tags.indexOf(tag)).includes(tag))
        ) && tags.length <= 5
      );
    }, 'Хэш-теги введены неверно');

    // Ограничения на комментарий
    pristine.addValidator(descriptionTextArea, (value) => value.length <= 140, 'Комментарий слишком длинный');
  }

  // Отправка формы на сервер
  async function sendForm(event, pristineInstance) {
    event.preventDefault();
    if (!pristineInstance.validate()) return;

    try {
      submitButton.disabled = true;
      const formData = new FormData(document.forms['upload-select-image']);
      await fetch('https://28.javascript.htmlacademy.pro/kekstagram', {
        method: 'POST',
        body: formData
      });
      alert('Фото опубликовано!');
      resetForm();
    } catch (err) {
      alert('Возникла проблема при отправке фото. Попробуйте снова.');
    } finally {
      submitButton.disabled = false;
    }
  }

  // Возвращение формы в исходное состояние
  function resetForm() {
    document.forms['upload-select-image'].reset();
    imagePreview.style.filter = '';
    sliderContainer.classList.add('hidden');
    effectLevelValue.value = '';
    currentScale = 100;
    updateScale(currentScale);
  }
})();
