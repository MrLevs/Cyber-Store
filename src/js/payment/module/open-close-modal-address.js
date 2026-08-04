'use strict';

export function openCloseModalAddress() {
  const modalAddress = document.querySelector('#dialog-address');
  const btnOpenAddress = document.querySelector('#btn-open-address');
  const btnCloseAddress = document.querySelector('#close-dialog-address');
  const blockWarning = document.querySelectorAll('.payment__warning');
  const btnAddAddress = document.querySelector('#btn-add-address');
  const btnEditAddress = document.querySelector('#btn-edit-address');

  if (btnOpenAddress && btnCloseAddress) {
    btnOpenAddress.addEventListener('click', openModal);
    btnOpenAddress.addEventListener('keydown', openModalEnter);
    btnCloseAddress.addEventListener('click', closeModal);
    btnCloseAddress.addEventListener('keydown', closeModalEnter);
  }

  if (blockWarning.length > 0) {
    blockWarning.forEach(item => {
      item.style.display = 'none';
    });
  }

  function openModal() {
    document.body.classList.add('_lock');
    btnAddAddress.style.display = 'block';
    btnEditAddress.style.display = 'none';
    modalAddress.showModal();
  }

  function openModalEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      openModal();
    }
  }

  function closeModal(event) {
    event.preventDefault();

    const inputWarning = document.querySelectorAll('.payment__form-add-address-input_warning');
    const blockWarning = document.querySelectorAll('.payment__warning_warning');

    document.body.classList.remove('_lock');
    modalAddress.close();

    if (inputWarning.length > 0) {
      inputWarning.forEach(item => {
        item.classList.remove('payment__form-add-address-input_warning');
        item.value = '';
      });
    }

    if (blockWarning.length > 0) {
      blockWarning.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('payment__warning_warning');
        item.style.display = 'none';
      });
    }
  }

  function closeModalEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      closeModal(event);
    }
  }
}
