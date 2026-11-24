'use strict';

import { getComment } from './module/get-comment'; // Get User Review
import { validCommentInput } from './module/valid-comment-input'; // Validation Input
import { addNewReview } from '../../../reviews-store'; // add New Review in indexedDB

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

  if (!modalReview) return;

  if (ratingWarning) {
    ratingWarning.style.display = 'none';
  }

  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', openModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', event => {
      event.preventDefault();
      modalReview.close();
    });
  }

  modalReview.addEventListener('close', resetModalState);

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
        controlRating();
      });
      item.addEventListener('keydown', event => {
        if (event.code === 'Enter') {
          event.preventDefault();
          if (item.control) {
            item.control.checked = true;
            controlRating();
          }
        }
      });
    });
  }

  if (inputFile) {
    inputFile.addEventListener('change', () => {
      container.innerHTML = '';
      clearUrl();

      const files = Array.from(inputFile.files);

      if (files.length > 10) {
        inputFile.value = '';
        container.textContent = 'You can only upload a maximum of 10 files!';
        return;
      }

      files.forEach(item => {
        let url = URL.createObjectURL(item);
        urlFilePreview.push(url);
        createPreview(url, container, item, removeFile);
      });
    });
  }

  if (btnSendComment) {
    btnSendComment.addEventListener('click', reviewSetDatabase);
  }

  //---------Show modal----------
  function openModal() {
    document.body.classList.add('_lock');
    modalReview.showModal();
  }

  //-----Remove file from inputFile and memory-------
  function removeFile(fileToRemove, urlToRevoke) {
    const dt = new DataTransfer();
    Array.from(inputFile.files).forEach(item => {
      if (item !== fileToRemove) {
        dt.items.add(item);
      }
    });
    inputFile.files = dt.files;

    URL.revokeObjectURL(urlToRevoke);
    urlFilePreview = urlFilePreview.filter(url => url !== urlToRevoke);
  }

  //----- controlRaiting----------
  function controlRating() {
    const stars = document.querySelectorAll('.form-review__svg_warning');
    if (stars.length > 0) {
      stars.forEach(item => {
        item.classList.remove('form-review__svg_warning');
      });

      if (ratingWarning && ratingWarning.textContent.trim() !== '') {
        ratingWarning.innerHTML = '';
        ratingWarning.style.display = 'none';
      }
    }
  }

  //------Review Set Database------------
  async function reviewSetDatabase() {
    const userReview = getComment();
    if (!userReview) {
      btnSendComment.blur();
      return;
    }

    try {
      btnSendComment.disabled = true;
      await addNewReview(userReview);
      modalReview.close();
    } catch (error) {
      console.error('Failed to save review:', error);
    } finally {
      btnSendComment.disabled = false;
    }
  }

  //---------Reset ModalReview----------------------
  function resetModalState() {
    document.body.classList.remove('_lock');

    document.querySelectorAll('.warning__input').forEach(item => {
      item.classList.remove('warning__input');
    });

    document.querySelectorAll('.warning_alert').forEach(item => {
      item.innerHTML = '';
      item.classList.remove('warning_alert');
      item.style.display = 'none';
    });

    controlRating();

    inputComment.forEach(item => {
      item.value = '';
    });

    inputRating.forEach(item => {
      item.checked = false;
    });

    if (inputFile) {
      inputFile.value = '';
    }

    container.innerHTML = '';
    clearUrl();
  }

  //----- Clear URl.revokeObjectURL()--------
  function clearUrl() {
    urlFilePreview.forEach(item => {
      URL.revokeObjectURL(item);
    });
    urlFilePreview.length = 0;
  }
}

//----- Create Preview----------------
function createPreview(url, container, file, onRemove) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const btnDelete = document.createElement('button');

  div.className = 'form-review__preview-inner';
  img.className = 'form-review__preview-img';
  img.src = url;
  img.alt = file.name;

  btnDelete.type = 'button';
  btnDelete.className = 'form-review__preview-delete';
  btnDelete.setAttribute('aria-label', `Delete ${file.name}`);

  div.append(img, btnDelete);
  container.append(div);

  btnDelete.addEventListener('click', () => {
    onRemove(file, url);
    div.remove();
  });
}
