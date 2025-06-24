import { isEscape } from './utils.js';

const body = document.body;
const SUCCESS_TEMPLATE = document.querySelector('#success');
const ERROR_TEMPLATE = document.querySelector('#error');

export function showSuccessMessage() {
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

export function showErrorMessage() {
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
