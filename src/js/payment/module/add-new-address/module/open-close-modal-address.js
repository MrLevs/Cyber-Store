'use strict';

export function openCloseModalAddress() {
  const modalAddress = document.querySelector('#dialog-address');
  const btnOpenAddress = document.querySelector('#btn-open-address');
  const btnCloseAddress = document.querySelector('#close-dialog-address');

  if (btnOpenAddress && btnCloseAddress) {
    btnOpenAddress.addEventListener('click', openModal);
    btnCloseAddress.addEventListener('click', closeModal);
  }

  function openModal() {
    document.body.classList.add('_lock');
    modalAddress.showModal();
  }

  function closeModal(event) {
    event.preventDefault();
    document.body.classList.remove('_lock');
    modalAddress.close();
  }
}
