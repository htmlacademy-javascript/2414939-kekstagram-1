// import { isEscape } from './utils.js';

// const body = document.body;
// const SUCCESS_TEMPLATE = document.querySelector('#success');
// const ERROR_TEMPLATE = document.querySelector('#error');

// export function showSuccessMessage() {
//   const successElement = SUCCESS_TEMPLATE.content.querySelector('.success').cloneNode(true);
//   body.appendChild(successElement);

//   const messageEl = successElement;

//   const onClick = (e) => {
//     if (e.target.classList.contains('success__button')) {
//       removeMessage();
//     }
//   };

//   const onKeyDown = (e) => {
//     if (isEscape(e)) {
//       removeMessage();
//     }
//   };

//   function removeMessage() {
//     messageEl.remove();
//     document.removeEventListener('click', onClick);
//     document.removeEventListener('keydown', onKeyDown);
//   }

//   document.addEventListener('click', onClick);
//   document.addEventListener('keydown', onKeyDown);
// }

// export function showErrorMessage() {
//   const errorElement = ERROR_TEMPLATE.content.querySelector('.error').cloneNode(true);
//   body.appendChild(errorElement);

//   const messageEl = errorElement;

//   const onClick = (e) => {
//     if (e.target.classList.contains('error__button')) {
//       removeMessage();
//     }
//   };

//   const onKeyDown = (e) => {
//     if (isEscape(e)) {
//       removeMessage();
//     }
//   };

//   function removeMessage() {
//     messageEl.remove();
//     document.removeEventListener('click', onClick);
//     document.removeEventListener('keydown', onKeyDown);
//   }

//   document.addEventListener('click', onClick);
//   document.addEventListener('keydown', onKeyDown);
// }
import { isEscape } from './utils.js';

const body = document.body;
const SUCCESS_TEMPLATE = document.querySelector('#success');
const ERROR_TEMPLATE = document.querySelector('#error');

/**
 * Общая функция для отображения сообщения.
 * @param {HTMLTemplateElement} template - шаблон сообщения.
 * @param {string} buttonClass - класс кнопки для закрытия сообщения.
 */
function createMessage(template, buttonClass) {
  const messageElement = template.content.querySelector(`.${buttonClass}`).cloneNode(true);
  body.appendChild(messageElement);

  const onClick = (e) => {
    // Закрытие при клике на кнопку
    if (e.target.classList.contains(buttonClass)) {
      removeMessage();
    }
    // Или при клике вне сообщения (опционально)
    // Можно раскомментировать следующий блок, если нужно закрывать при клике вне сообщения
    /*
    if (!e.target.closest('.' + messageElement.className)) {
      removeMessage();
    }
    */
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

/**
 * Показывает сообщение об успехе.
 */
export function showSuccessMessage() {
  createMessage(SUCCESS_TEMPLATE, 'success__button');
}

/**
 * Показывает сообщение об ошибке.
 */
export function showErrorMessage() {
  createMessage(ERROR_TEMPLATE, 'error__button');
}
