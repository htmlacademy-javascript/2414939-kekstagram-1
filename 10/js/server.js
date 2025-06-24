// server3.js

import { isEscape } from './utils.js';

const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const ERROR_TEMPLATE = document.querySelector('#error').content;
const body = document.body;

// Функция отправки данных на сервер
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

// Показывает сообщение об успешной отправке
export async function sendDataToServer(formData) {
 function showSuccessMessage() {
  const successMessage = SUCCESS_TEMPLATE.cloneNode(true);
  body.appendChild(successMessage);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('success__button')) {
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
export async function sendDataToServer(formData) {
 function showErrorMessage() {
  const errorMessage = ERROR_TEMPLATE.cloneNode(true);
  body.appendChild(errorMessage);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('error__button')) {
      removeMessage(errorMessage);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (isEscape(e)) {
      removeMessage(errorMessage);
    }
  });
}

// Функция для удаления сообщения
export function removeMessage(message) {
  if (message.parentNode) {
    message.parentNode.removeChild(message);
  }
  document.removeEventListener('click', removeMessage);
  document.removeEventListener('keydown', removeMessage);
}

// Функция для блокировки кнопки отправки
export function blockSubmitButton(button) {
  if (button) { // Проверяем, что кнопка существует
    button.disabled = true;
    button.classList.add('loading');
  }
}

// Функция для разблокировки кнопки отправки
export function unblockSubmitButton(button) {
  if (button) { // Аналогичная проверка
    button.disabled = false;
    button.classList.remove('loading');
  }
}

// Функция для создания формы данных
export function createFormData(form) {
  const formData = new FormData(form);
  return formData;
}
