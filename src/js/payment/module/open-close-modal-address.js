'use strict';

export function openCloseModalAddress() {
  const modalAddress = document.querySelector('#dialog-address');
  const btnOpenAddress = document.querySelector('#btn-open-address');
  const btnCloseAddress = document.querySelector('#close-dialog-address');
  const blockWarning = document.querySelectorAll('.payment__warning');

  if (btnOpenAddress && btnCloseAddress) {
    btnOpenAddress.addEventListener('click', openModal);
    btnCloseAddress.addEventListener('click', closeModal);
  }

  if (blockWarning.length > 0) {
    blockWarning.forEach(item => {
      item.style.display = 'none';
    });
  }

  function openModal() {
    document.body.classList.add('_lock');
    modalAddress.showModal();
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
}
