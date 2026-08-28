'use strict';

import { validCommentInput } from './module/valid-comment-input'; // Validation Input

export function sendComment() {
  const modalReview = document.querySelector('#dialog-review');
  const btnOpenModal = document.querySelector('.leave-comment');
  const btnCloseModal = document.querySelector('#close-dialog-review');
  const inputComment = Array.from(document.querySelectorAll('.form-review__input'));
  const inputFile = document.querySelector('#form-review-file');
  const btnSendComment = document.querySelector('.form-review__btn');
  let urlFilePreview = [];

  if (btnOpenModal && btnCloseModal) {
    btnOpenModal.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
  }

  if (inputComment) {
    inputComment.forEach(item => {
      item.addEventListener('input', () => {
        validCommentInput(item);
      });
    });
  }

  if (inputFile) {
    const container = document.querySelector('.form-review__preview');
    inputFile.addEventListener('change', event => {
      let file = Array.from(event.target.files);
      file.forEach((item, index) => {
        let url = URL.createObjectURL(item);
        urlFilePreview.push(url);
        createPreview(url, container, index);
      });
    });
  }

  if (btnSendComment) {
    btnSendComment.addEventListener('click', () => {
      if (urlFilePreview.length > 0) {
        clearUrl();
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
    document.body.classList.remove('_lock');
    modalReview.close();
    if (urlFilePreview.length > 0) {
      clearUrl();
    }
    //очистить инпуты!!!!
  }

  //----- Clear URl.revokeObjectURL()--------
  function clearUrl() {
    urlFilePreview.forEach(item => {
      URL.revokeObjectURL(item);
    });
    urlFilePreview.length = 0;
  }
}

function createPreview(url, container, index) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const btnDelet = document.createElement('button');

  div.className = 'form-review__preview-inner';
  div.id = `preview-inner-${index}`;
  img.className = 'form-review__preview-img';
  img.src = url;
  console.log(img.src);
  btnDelet.type = 'button';
  btnDelet.className = 'form-review__preview-img';

  div.append(img, btnDelet);
  container.append(div);

  btnDelet.addEventListener('click', () => {
    removeContainer();
  });

  btnDelet.addEventListener('keydown', event => {
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
