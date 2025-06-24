// server2.js

import { isEscape } from './utils.js';

const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const ERROR_TEMPLATE = document.querySelector('#error').content;
const body = document.body;

/**
 * Отправка данных на сервер
 * @param {FormData} formData - данные формы
 * @returns {Promise<boolean>} - результат отправки
 */
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

/**
 * Показывает сообщение об успешной отправке
 */
function showSuccessMessage() {
  const successMessage = SUCCESS_TEMPLATE.cloneNode(true);
  body.appendChild(successMessage);

  // Обработчики для закрытия сообщения
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

  // Функция для удаления сообщения и очистки слушателей
  function removeMessage() {
    successMessage.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  // Добавляем слушатели
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

/**
 * Показывает сообщение об ошибке
 */
function showErrorMessage() {
  const errorMessage = ERROR_TEMPLATE.cloneNode(true);
  body.appendChild(errorMessage);

  // Обработчики для закрытия сообщения
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

  // Функция для удаления сообщения и очистки слушателей
  function removeMessage() {
    errorMessage.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  // Добавляем слушатели
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

/**
 * Блокирует кнопку отправки формы
 * @param {HTMLElement} button - кнопка формы
 */
export function blockSubmitButton(button) {
  if (button) {
    button.disabled = true;
    button.classList.add('loading');
  }
}

/**
 * Разблокирует кнопку отправки формы
 * @param {HTMLElement} button - кнопка формы
 */
export function unblockSubmitButton(button) {
  if (button) {
    button.disabled = false;
    button.classList.remove('loading');
  }
}

/**
 * Создает объект FormData из формы
 * @param {HTMLFormElement} form - форма
 * @returns {FormData}
 */
export function createFormData(form) {
  return new FormData(form);
}
