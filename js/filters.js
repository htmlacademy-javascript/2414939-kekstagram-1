function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function sortByComments(photos) {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
}

export function setActiveFilter(button) {
  document.querySelectorAll('.img-filters__button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
}

export function setupFilters(currentPhotos, renderThumbnails, openBigPicture) {
  const defaultBtn = document.getElementById('filter-default');
  const randomBtn = document.getElementById('filter-random');
  const discussedBtn = document.getElementById('filter-discussed');

  function handleDefaultClick() {
    renderThumbnails(currentPhotos, openBigPicture);
    setActiveFilter(defaultBtn);
  }

  function handleRandomClick() {
    const shuffled = shuffleArray([...currentPhotos]);
    renderThumbnails(shuffled, openBigPicture);
    setActiveFilter(randomBtn);
  }

  function handleDiscussedClick() {
    const sorted = sortByComments([...currentPhotos]);
    renderThumbnails(sorted, openBigPicture);
    setActiveFilter(discussedBtn);
  }

  const debouncedRenderDefault = debounce(handleDefaultClick, 500);
  const debouncedRenderRandom = debounce(handleRandomClick, 500);
  const debouncedRenderDiscussed = debounce(handleDiscussedClick, 500);

  defaultBtn.addEventListener('click', debouncedRenderDefault);
  randomBtn.addEventListener('click', debouncedRenderRandom);
  discussedBtn.addEventListener('click', debouncedRenderDiscussed);
}


