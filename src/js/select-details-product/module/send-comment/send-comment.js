'use strict';

import { getComment } from './module/get-comment'; // Get User Review
import { validCommentInput } from './module/valid-comment-input'; // Validation Input

export function sendComment() {
  const modalReview = document.querySelector('#dialog-review');
  const btnOpenModal = document.querySelector('.leave-comment');
  const btnCloseModal = document.querySelector('#close-dialog-review');
  const inputRating = document.querySelectorAll('.form-review__radio');
  const labelRating = document.querySelectorAll('.form-review__star');
  const ratingWarning = document.querySelector('.form-review__rating-warning');
  const inputComment = document.querySelectorAll('.form-review__input');
  const inputFile = document.querySelector('#form-review-file');
  const container = document.querySelector('.form-review__preview');
  const btnSendComment = document.querySelector('.form-review__btn');
  let urlFilePreview = [];
  let userReview;

  ratingWarning.style.display = 'none';

  if (btnOpenModal && btnCloseModal) {
    btnOpenModal.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
  }

  if (inputComment.length > 0) {
    inputComment.forEach(item => {
      item.addEventListener('input', () => {
        validCommentInput(item);
      });
    });
  }

  if (labelRating.length > 0) {
    labelRating.forEach(item => {
      item.addEventListener('click', () => {
        let stars = document.querySelectorAll('.form-review__svg');
        stars.forEach(item => {
          item.classList.remove('form-review__svg_warning');
        });

        if (ratingWarning.textContent.trim() !== '') {
          ratingWarning.innerHTML = '';
          ratingWarning.style.display = 'none';
        }
      });
    });
  }

  if (inputFile) {
    inputFile.addEventListener('change', event => {
      container.innerHTML = '';

      if (inputFile.files.length > 10) {
        inputFile.value = '';
        container.textContent = 'You can only upload a maximum of 10 files!';
      } else {
        let file = Array.from(event.target.files);
        file.forEach((item, index) => {
          let url = URL.createObjectURL(item);
          urlFilePreview.push(url);
          createPreview(url, container, index, item.name);
        });
      }
    });
  }

  if (btnSendComment) {
    btnSendComment.addEventListener('click', () => {
      reviewSetDatabase();
    });

    btnSendComment.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        reviewSetDatabase();
      }
    });
  }

  //---------Show modal----------
  function openModal() {
    document.body.classList.add('_lock');
    modalReview.showModal();
  }

  function closeModal(event) {
    event.preventDefault();

    const inputWarning = document.querySelectorAll('.warning__input');
    const blockWarning = document.querySelectorAll('.warning_alert');

    if (inputWarning.length > 0) {
      inputWarning.forEach(item => {
        item.classList.remove('warning__input');
        item.value = '';
      });
    }

    if (blockWarning.length > 0) {
      blockWarning.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('warning_alert');
        item.style.display = 'none';
      });
    }
    clearModalReview();
  }

  //------Review Set Database------------
  function reviewSetDatabase() {
    userReview = getComment();
    if (userReview) {
      let reviewsCollection = JSON.parse(localStorage.getItem('reviews'));
      if (reviewsCollection) {
        reviewsCollection.push(userReview);
        localStorage.setItem('reviews', JSON.stringify(reviewsCollection));
      } else {
        localStorage.setItem('reviews', JSON.stringify([userReview]));
      }
      clearModalReview();
    } else {
      btnSendComment.blur();
    }
  }

  //---------Clear ModalReview----------------------
  function clearModalReview() {
    document.body.classList.remove('_lock');
    modalReview.close();
    inputComment.forEach(item => {
      item.value = '';
    });
    inputRating.forEach(item => {
      item.checked = false;
    });
    container.innerHTML = '';
    if (urlFilePreview.length > 0) {
      clearUrl();
    }
  }

  //----- Clear URl.revokeObjectURL()--------
  function clearUrl() {
    urlFilePreview.forEach(item => {
      URL.revokeObjectURL(item);
    });
    urlFilePreview.length = 0;
  }
}

function createPreview(url, container, index, fileName) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const btnDelete = document.createElement('button');

  div.className = 'form-review__preview-inner';
  div.id = `preview-inner-${index}`;
  img.className = 'form-review__preview-img';
  img.src = url;
  img.setAttribute('alt', `${fileName}`);

  btnDelete.type = 'button';
  btnDelete.className = 'form-review__preview-delete';
  btnDelete.setAttribute('aria-label', 'Delete');

  div.append(img, btnDelete);
  container.append(div);

  btnDelete.addEventListener('click', () => {
    removeContainer();
  });

  btnDelete.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
      event.preventDefault();
      removeContainer();
    }
  });

  function removeContainer() {
    const container = document.querySelector(`#preview-inner-${index}`);
    container.remove();
  }
}
