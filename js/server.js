import { isEscape } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';

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
 * Блокировка кнопки отправки формы
 * @param {HTMLElement} button - кнопка формы
 */
export function blockSubmitButton(button) {
  if (button) {
    button.disabled = true;
    button.classList.add('loading');
  }
}

/**
 * Разблокировка кнопки отправки формы
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
