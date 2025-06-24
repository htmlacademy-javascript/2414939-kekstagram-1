import { isEscape } from './utils.js';

const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const SUCCESS_TEMPLATE = document.querySelector('#success');
const ERROR_TEMPLATE = document.querySelector('#error');
const body = document.body;

export async function sendDataToServer(formData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      showSuccessMessage();
      return true;
    } else {
      showErrorMessage();
      console.error('Ошибка сервера:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    showErrorMessage();
    return false;
  }
}

function showSuccessMessage() {
  const successElement = SUCCESS_TEMPLATE.content.querySelector('.success').cloneNode(true);
  body.appendChild(successElement);

  const messageEl = successElement;

  const onClick = (e) => {
    if (e.target.classList.contains('success__button')) {
      removeMessage();
    }
  };

  const onKeyDown = (e) => {
    if (isEscape(e)) {
      removeMessage();
    }
  };

  function removeMessage() {
    messageEl.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

function showErrorMessage() {

  const errorElement = ERROR_TEMPLATE.content.querySelector('.error').cloneNode(true);
  body.appendChild(errorElement);

  const messageEl = errorElement;

  const onClick = (e) => {
    if (e.target.classList.contains('error__button')) {
      removeMessage();
    }
  };

  const onKeyDown = (e) => {
    if (isEscape(e)) {
      removeMessage();
    }
  };

  function removeMessage() {
    messageEl.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

export function blockSubmitButton(button) {
  if (button) {
    button.disabled = true;
    button.classList.add('loading');
  }
}

export function unblockSubmitButton(button) {
  if (button) {
    button.disabled = false;
    button.classList.remove('loading');
  }
}

export function createFormData(form) {
  return new FormData(form);
}
