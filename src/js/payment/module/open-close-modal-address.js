'use strict';

export function openCloseModalAddress() {
  const modalAddress = document.querySelector('#dialog-address');
  const btnOpenAddress = document.querySelector('#btn-open-address');
  const btnCloseAddress = document.querySelector('#close-dialog-address');
  const btnAddAddress = document.querySelector('#btn-add-address');
  const btnEditAddress = document.querySelector('#btn-edit-address');

  if (btnOpenAddress && btnCloseAddress) {
    btnOpenAddress.addEventListener('click', openModal);
    btnOpenAddress.addEventListener('keydown', openModalEnter);
    btnCloseAddress.addEventListener('click', closeModal);
    btnCloseAddress.addEventListener('keydown', closeModalEnter);
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

    if (event.currentTarget.classList.contains('payment__form-add-address-close_edit')) {
      const inputAddressAll = document.querySelectorAll('.payment__form-add-address-input');
      inputAddressAll.forEach(item => {
        item.value = '';
      });
    } else {
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
    }

    event.currentTarget.classList.remove('payment__form-add-address-close_edit');
    document.body.classList.remove('_lock');
    modalAddress.close();
  }

  function closeModalEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      closeModal(event);
    }
  }
}
