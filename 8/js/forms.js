// Предположим, что DOM полностью загружен
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация Pristine для формы с именем 'upload-select-image'
  const pristine = new Pristine(document.forms['upload-select-image'], {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper'
  });

  // Получение элементов для масштабирования
  const scaleValueInput = document.querySelector('.scale__control--value'); // input с текущим масштабом
  const previewImage = document.querySelector('.img-upload__preview img'); // изображение для масштабирования

  const smallerBtn = document.querySelector('.scale__control--smaller');
  const biggerBtn = document.querySelector('.scale__control--bigger');

  if (scaleValueInput && previewImage && smallerBtn && biggerBtn) {
    // Обработчик для уменьшения масштаба
    smallerBtn.addEventListener('click', () => {
      let currentScalePercent = parseInt(scaleValueInput.value);
      if (currentScalePercent > 10) { // минимальный масштаб 10%
        currentScalePercent -= 10;
        scaleValueInput.value = `${currentScalePercent}%`;
        previewImage.style.transform = `scale(${currentScalePercent / 100})`;
      }
    });

    // Обработчик для увеличения масштаба
    biggerBtn.addEventListener('click', () => {
      let currentScalePercent = parseInt(scaleValueInput.value);
      if (currentScalePercent < 100) { // максимальный масштаб 100%
        currentScalePercent += 10;
        scaleValueInput.value = `${currentScalePercent}%`;
        previewImage.style.transform = `scale(${currentScalePercent / 100})`;
      }
    });
  }

  // Дополнительно: обработка выбора эффекта
  const effectRadios = document.querySelectorAll('.effects__list input[type="radio"]');
  const effectPreviewContainer = document.querySelector('.img-upload__preview');

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const effect = radio.value;
      // Очистить предыдущие эффекты
      previewImage.className = '';

      switch (effect) {
        case 'none':
          previewImage.style.filter = '';
          break;
        case 'chrome':
          previewImage.style.filter = 'grayscale(100%)';
          break;
        case 'sepia':
          previewImage.style.filter = 'sepia(100%)';
          break;
        case 'marvin':
          previewImage.style.filter = 'invert(100%)';
          break;
        case 'phobos':
          previewImage.style.filter = 'blur(3px)';
          break;
        case 'heat':
          previewImage.style.filter = 'brightness(2)';
          break;
        default:
          previewImage.style.filter = '';
      }
    });
  });

  // Обработка формы загрузки файла
  const uploadForm = document.getElementById('upload-select-image');

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      // Здесь можно отправлять данные на сервер или показывать сообщение об успехе
      console.log('Форма валидна, можно отправлять');

      // Например, показываем шаблон успеха
      const successTemplate = document.getElementById('success').content.cloneNode(true);
      document.body.appendChild(successTemplate);

      // Можно добавить обработчик закрытия сообщения и сброс формы
    } else {
      console.log('Форма содержит ошибки');
    }
  });

});
