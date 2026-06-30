'use strict';

export function selectDetailsProduct() {
  const labelFormColors = document.querySelectorAll('.info__form-colors-label');
  const labelFormMemory = document.querySelectorAll('.info__form-memory-label');

  //-----Form Colors--------------------------
  if (labelFormColors.length > 0) {
    labelFormColors.forEach(item => {
      item.addEventListener('click', selectColor);
      item.addEventListener('keydown', selectColorEnter);
    });
  }

  function selectColor(event) {
    labelBorderColor(event, labelFormColors);
  }

  function selectColorEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      event.currentTarget.control.checked = true;
      labelBorderColor(event, labelFormColors);
    }
  }

  function labelBorderColor(event, elem) {
    const html = document.querySelector('html');
    elem.forEach(item => {
      if (html.classList.contains('root')) {
        item.style.borderColor = '#fff';
      } else {
        item.style.borderColor = '#1f2020';
      }
    });

    event.currentTarget.style.borderColor = 'blue';
  }
  //-------------------------------------------------
  //-----Form Memory----------------------------
  if (labelFormMemory.length > 0) {
    labelFormMemory.forEach(item => {
      item.addEventListener('click', selectMemory);
      item.addEventListener('keydown', selectMemoryEnter);
    });
  }

  function selectMemory(event) {
    BorderColorFormMemory(event, labelFormMemory);
  }

  function selectMemoryEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      event.currentTarget.control.checked = true;
      BorderColorFormMemory(event, labelFormMemory);
    }
  }

  function BorderColorFormMemory(event, elem) {
    const html = document.querySelector('html');
    elem.forEach(item => {
      if (html.classList.contains('root')) {
        item.style.borderColor = '#000';
      } else {
        item.style.borderColor = '#fff';
      }
      item.style.opacity = '0.6';
    });

    event.currentTarget.style.borderColor = 'blue';
    event.currentTarget.style.opacity = '1';
  }
  //---------------------------------------------
  //---------Show modal----------
  const modalReview = document.querySelector('#dialog-review');
  const btnOpenModal = document.querySelector('.leave-comment');
  const btnCloseModal = document.querySelector('#close-dialog-review');

  if (btnOpenModal && btnCloseModal) {
    btnOpenModal.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
  }

  function openModal() {
    document.body.classList.add('_lock');
    modalReview.showModal();
  }

  function closeModal(event) {
    event.preventDefault();
    document.body.classList.remove('_lock');
    modalReview.close();
  }
}
