import { isEscape } from './utils.js';

const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const ERROR_TEMPLATE = document.querySelector('#error').content;
const body = document.body;

// Функция отправки данных на сервер
export async function sendDataToServer(formData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  if (response.ok) {
    showSuccessMessage();
    return true;
  } else {
    showErrorMessage();
    return false;
  }
}

// Показывает сообщение об успешной отправке
function showSuccessMessage() {
  const successMessage = SUCCESS_TEMPLATE.cloneNode(true);
  body.appendChild(successMessage);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('success__button') ||
        e.target.closest('.success') === null) {
      removeMessage(successMessage);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (isEscape(e)) {
      removeMessage(successMessage);
    }
  });
}

// Показывает сообщение об ошибке
function showErrorMessage() {
  const errorMessage = ERROR_TEMPLATE.cloneNode(true);
  body.appendChild(errorMessage);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('error__button') ||
        e.target.closest('.error') === null) {
      removeMessage(errorMessage);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (isEscape(e)) {
      removeMessage(errorMessage);
    }
  });
}

// Удаляет сообщение
function removeMessage(message) {
  body.removeChild(message);
  document.removeEventListener('click', removeMessage);
  document.removeEventListener('keydown', removeMessage);
}

// Функция для блокировки кнопки отправки
export function blockSubmitButton(button) {
  button.disabled = true;
  button.classList.add('loading');
}

// Функция для разблокировки кнопки отправки
export function unblockSubmitButton(button) {
  button.disabled = false;
  button.classList.remove('loading');
}

// Функция для создания формы данных
export function createFormData(form) {
  const formData = new FormData(form);
  return formData;
}
