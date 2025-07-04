import { isEscape } from './utils.js';

const TPL = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const body = document.body;

function createMessage(templateId, buttonClass) {
  // Правильное использование интерполяции
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    console.error(`Шаблон с id="${templateId}" не найден`);
    return;
  }

  // Клонируем содержимое шаблона
  const messageElement = template.content.cloneNode(true).children[0]; // получаем корень (например, <section>)
  body.appendChild(messageElement);

  const button = messageElement.querySelector(`.${buttonClass}`);

  const removeMessage = () => {
    messageElement.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  };

  const onClick = (e) => {
    // Закрытие при клике на кнопку
    if (button && e.target.closest(`.${buttonClass}`)) {
      removeMessage();
    } else if (!e.target.closest(`.${messageElement.className}`)) {
      // Клик вне сообщения — закрываем
      removeMessage();
    }
  };

  const onKeyDown = (e) => {
    if (isEscape(e)) {
      removeMessage();
    }
  };

  // Обработчики
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

export function showSuccessMessage() {
  createMessage(TPL.SUCCESS, 'success__button');
}

export function showErrorMessage() {
  createMessage(TPL.ERROR, 'error__button');
}
