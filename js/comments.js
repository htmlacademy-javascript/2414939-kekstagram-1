// comments.js
const socialComments = document.querySelector('.social__comments');
const commentCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentTemplate = document.querySelector('.social__comment');

let currentPhotoComments = [];
let commentsShownCount = 0;
const COMMENTS_PER_STEP = 5;

function createCommentElement(comment) {
    const cloneSocialComment= socialCommentTemplate.cloneNode(true);
    cloneSocialComment.querySelector('.social__picture').src= comment.avatar;
    cloneSocialComment.querySelector('.social__picture').alt= comment.name;
    cloneSocialComment.querySelector('.social__text').textContent= comment.message;
    return cloneSocialComment;
}

function clearComments() {
    socialComments.innerHTML= '';
}

function renderComments() {
    socialComments.innerHTML= '';

    const commentsToShow= currentPhotoComments.slice(0, commentsShownCount);

    commentsToShow.forEach((comment) => {
        const commentEl= createCommentElement(comment);
        socialComments.appendChild(commentEl);
    });

    // Обновляем счетчик
    commentCountBlock.classList.remove('hidden');
    commentCountBlock.querySelector('.comments-count').textContent= `${commentsToShow.length} из ${currentPhotoComments.length}`;

    // Показываем или скрываем кнопку "Загрузить еще"
    if (commentsShownCount >= currentPhotoComments.length) {
        document.querySelector('.comments-loader').classList.add('hidden');
    } else {
        document.querySelector('.comments-loader').classList.remove('hidden');
    }
}

function showComments(photoComments) {
    currentPhotoComments = photoComments;
    commentsShownCount= Math.min(COMMENTS_PER_STEP, currentPhotoComments.length);
    renderComments();
}

function loadMoreComments() {
    commentsShownCount += COMMENTS_PER_STEP;
    if (commentsShownCount > currentPhotoComments.length) {
        commentsShownCount= currentPhotoComments.length;
    }
    renderComments();
}

export { showComments, clearComments, loadMoreComments };
