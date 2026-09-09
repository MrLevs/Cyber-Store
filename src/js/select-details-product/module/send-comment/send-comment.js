'use strict';

import { validCommentInput } from './module/valid-comment-input'; // Validation Input

export function sendComment() {
  const modalReview = document.querySelector('#dialog-review');
  const btnOpenModal = document.querySelector('.leave-comment');
  const btnCloseModal = document.querySelector('#close-dialog-review');
  const inputComment = Array.from(document.querySelectorAll('.form-review__input'));
  const inputFile = document.querySelector('#form-review-file');
  const container = document.querySelector('.form-review__preview');
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
    inputComment.forEach(item => {
      item.value = '';
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
