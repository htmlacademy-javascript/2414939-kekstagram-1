const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');

let currentScale = 100;

function increaseScale() {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
}

function decreaseScale() {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
}

function updateScale() {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

smallerBtn.addEventListener('click', decreaseScale);
biggerBtn.addEventListener('click', increaseScale);
