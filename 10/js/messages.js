import { isEscape } from './utils.js';

const body = document.body;
const SUCCESS_TEMPLATE = document.querySelector('#success');
const ERROR_TEMPLATE = document.querySelector('#error');


function createMessage(template, buttonClass) {
  const messageElement = template.content.querySelector(`.${buttonClass}`).cloneNode(true);
  body.appendChild(messageElement);

  const onClick = (e) => {
    // Закрытие при клике на кнопку
    if (e.target.classList.contains(buttonClass)) {
      removeMessage();
    }
  };

  const onKeyDown = (e) => {
    if (isEscape(e)) {
      removeMessage();
    }
  };

  function removeMessage() {
    messageElement.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  // Добавляем обработчики
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

export function showSuccessMessage() {
  createMessage(SUCCESS_TEMPLATE, 'success__button');
}

export function showErrorMessage() {
  createMessage(ERROR_TEMPLATE, 'error__button');
}
