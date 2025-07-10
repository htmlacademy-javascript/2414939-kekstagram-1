export const SCALE_STEP = 25;
export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const DEFAULT_SCALE = MAX_SCALE;
export const scaleState = {
  currentScale: MAX_SCALE,
};

const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

а
function updateScale() {
  scaleValue.value = `${scaleState.currentScale}%`;
  previewImage.style.transform = `scale(${scaleState.currentScale / 100})`;
  if (scaleInput) {
    scaleInput.value = `${scaleState.currentScale}%`;
  }
}

function increaseScale() {
  if (scaleState.currentScale < MAX_SCALE) {
    scaleState.currentScale += SCALE_STEP;
    updateScale();
  }
}

function decreaseScale() {
  if (scaleState.currentScale > MIN_SCALE) {
    scaleState.currentScale -= SCALE_STEP;
    updateScale();
  }
}


smallerBtn.addEventListener('click', decreaseScale);
biggerBtn.addEventListener('click', increaseScale);

updateScale();

export { updateScale, increaseScale, decreaseScale, previewImage };
