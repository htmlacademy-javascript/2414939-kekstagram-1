// import { showSuccessMessage, showErrorMessage } from './messages.js';
// import { showAlert } from './utils.js';

// const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
// const DATA_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';

// export async function sendDataToServer(formData) {
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       body: formData
//     });

//     if (response.ok) {
//       showSuccessMessage();
//       return true;
//     } else {
//       showErrorMessage();
//       return false;
//     }
//   } catch (error) {
//     showErrorMessage();
//     return false;
//   }
// }

// export function createFormData(form) {
//   return new FormData(form);
// }

// export async function loadPhotosFromServer(url = DATA_URL) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Ошибка загрузки данных (${response.status})`);
//     }
//     return await response.json();
//   } catch (error) {
//     showAlert('Не удалось загрузить данные с сервера. попробуйте позже.');
//     return [];
//   }
// }

// server.js

import { showAlert } from './utils.js'; // если у вас есть такая функция для отображения ошибок

const DATA_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data'; // URL для получения данных

/**
 * Загружает фотографии с сервера.
 * @param {string} url - URL для загрузки данных. По умолчанию DATA_URL.
 * @returns {Promise<Array>} - Обещание, которое возвращает массив фотографий.
 */
export async function loadPhotosFromServer(url = DATA_URL) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    showAlert('Не удалось загрузить данные с сервера. попробуйте позже.');
    return [];
  }
}
