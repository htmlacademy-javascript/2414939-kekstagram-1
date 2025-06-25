import { showSuccessMessage, showErrorMessage } from './messages.js';

const API_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';

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
      return false;
    }
  } catch (error) {
    showErrorMessage();
    return false;
  }
}

export function createFormData(form) {
  return new FormData(form);
}

export async function loadPhotosFromServer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    return [];
  }
}
