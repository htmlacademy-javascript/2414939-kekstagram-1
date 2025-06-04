import { Pristine } from '../pristine.min.js';

const uploadForm = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextArea = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

const pristineInstance = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

pristineInstance.addValidator(
  hashtagsInput,
  validateHashtags,
  'Неверный формат хэштегов'
);

function validateHashtags(value) {
  if (!value.trim()) return true;

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const valid = hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const unique = new Set(hashtags).size === hashtags.length;

  return hashtags.length <= 5 && valid && unique;
}

function sendForm(e) {
  e.preventDefault();

  if (pristineInstance.validate()) {
    console.log('Форма прошла валидацию и готова к отправке!');
  } else {
    console.warn('Форма не прошла валидацию');
  }
}

uploadForm.addEventListener('submit', sendForm);
