import { isEscape } from './utils.js';
import noUiSlider from 'nouislider'; // Подключаем noUiSlider явно

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

// Класс для управления загрузчиком изображений
class ImageUploader {
  constructor() {
    this.fileChooser = document.querySelector('#upload-file');
    this.overlay = document.querySelector('.img-upload__overlay');
    this.body = document.body;
    this.smallerBtn = document.querySelector('.scale__control--smaller');
    this.biggerBtn = document.querySelector('.scale__control--bigger');
    this.scaleValue = document.querySelector('.scale__control--value');
    this.previewImage = document.querySelector('.img-upload__preview > img');
    this.effectsRadios = Array.from(document.querySelectorAll('.effects__radio')); // Используем Array.from()
    this.sliderContainer = document.querySelector('.effect-level');
    this.effectSlider = document.querySelector('.effect-level__slider');
    this.effectLevelValue = document.querySelector('.effect-level__value');
    this.hashtagsInput = document.querySelector('.text__hashtags');
    this.descriptionTextArea = document.querySelector('.text__description');
    this.submitButton = document.querySelector('#upload-submit');
    this.uploadForm = document.querySelector('#upload-select-image');

    this.currentScale = 100;
    this.currentEffect = 'none';
    this.pristine = null;
  }

  init() {
    this.setupEvents();
    this.setupSlider();
    this.setupValidation();
  }

  setupEvents() {
    this.fileChooser.addEventListener('change', () => this.onFileSelected());
    document.querySelector('#upload-cancel').addEventListener('click', () => this.hideOverlay());
    this.smallerBtn.addEventListener('click', () => this.decreaseScale());
    this.biggerBtn.addEventListener('click', () => this.increaseScale());
    this.effectsRadios.forEach(radio => radio.addEventListener('change', () => this.applyEffect()));
    this.uploadForm.addEventListener('submit', e => this.sendForm(e));

    document.addEventListener('keydown', e => {
      if (isEscape(e)) {
        this.hideOverlay();
      }
    });
  }

  onFileSelected() {
    const file = this.fileChooser.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.showOverlay();
  }

  showOverlay() {
    this.overlay.classList.remove('hidden');
    this.body.classList.add('modal-open');
  }

  hideOverlay() {
    this.overlay.classList.add('hidden');
    this.body.classList.remove('modal-open');
    this.resetForm();
  }

  increaseScale() {
    if (this.currentScale < 100) {
      this.currentScale += 25;
      this.updateScale();
    }
  }

  decreaseScale() {
    if (this.currentScale > 25) {
      this.currentScale -= 25;
      this.updateScale();
    }
  }

  updateScale() {
    this.scaleValue.value = `${this.currentScale}%`;
    this.previewImage.style.transform = `scale(${this.currentScale / 100})`;
  }

  setupSlider() {
    if (typeof noUiSlider === 'undefined') {
      throw new Error("NoUiSlider library not found");
    }

    noUiSlider.create(this.effectSlider, {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
      connect: 'lower'
    });

    this.effectSlider.noUiSlider.on('update', values => {
      const value = parseFloat(values[0]);
      this.effectLevelValue.value = value;
      this.updateEffectStyle(value);
    });
  }

  applyEffect() {
    const selected = document.querySelector('input[name="effect"]:checked').value;
    this.currentEffect = selected;

    this.removeAllEffectClasses();

    if (selected === 'none') {
      this.previewImage.style.filter = '';
      this.sliderContainer.classList.add('hidden');
    } else {
      this.previewImage.classList.add(`effects__preview--${selected}`);
      const { range, step } = EFFECTS[selected];
      this.effectSlider.noUiSlider.updateOptions({ range, start: range.max, step });
      this.sliderContainer.classList.remove('hidden');
    }
  }

  removeAllEffectClasses() {
    this.previewImage.className = '';
    this.previewImage.classList.add('img-upload__preview-image');
  }

  updateEffectStyle(value) {
    if (this.currentEffect === 'none') {
      this.previewImage.style.filter = '';
      return;
    }

    const { filter, unit } = EFFECTS[this.currentEffect];
    this.previewImage.style.filter = `${filter}(${value}${unit})`;
  }

  setupValidation() {
    this.pristine = new Pristine(this.uploadForm, {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'img-upload__error'
    });

    this.pristine.addValidator(
      this.hashtagsInput,
      this.validateHashtags.bind(this),
      'Неверный формат хэштегов'
    );
  }

  validateHashtags(value) {
    if (!value.trim()) return true;

    const hashtags = value.toLowerCase().trim().split(/\s+/);
    const valid = hashtags.every(tag => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
    const unique = new Set(hashtags).size === hashtags.length;
    return hashtags.length <= 5 && valid && unique;
  }

  sendForm(event) {
    event.preventDefault();
    if (this.pristine.validate()) {
      console.log('Форма прошла валидацию и готова к отправке!');
      this.hideOverlay();
    } else {
      console.warn('Форма не прошла валидацию');
    }
  }

  resetForm() {
    this.uploadForm.reset();
    this.currentScale = 100;
    this.updateScale();
    this.previewImage.style.filter = '';
    this.removeAllEffectClasses();
    this.sliderContainer.classList.add('hidden');
    this.effectSlider.noUiSlider.set(1); // Возвращаем значение слайдера обратно к единице
  }
}

// Инициализируем всё после полной загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  const imageUploader = new ImageUploader();
  imageUploader.init();
});
