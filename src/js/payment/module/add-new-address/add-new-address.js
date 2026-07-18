'use strict';

import { validationAll, validationWS } from '../../../validation-value'; // Validation Input add Address
import { showWarningInputAddAddress } from '../../../warning'; // Show Warning Input add Address
import { addAddress } from './module/add-address'; // Add Address

export function addNewAddress() {
  const inputAddAddress = document.querySelectorAll('.payment__form-add-address-input_required');
  const btnAddAddress = document.querySelector('#btn-add-address');
  let userAddress;

  if (inputAddAddress.length > 0) {
    inputAddAddress.forEach(item => {
      item.addEventListener('input', () => {
        validAndShow(item);
      });

      if (item.type === 'number') {
        item.addEventListener('keydown', event => {
          if (event.code === 'KeyE') {
            event.preventDefault();
          }
        });
      }
    });
  }

  if (btnAddAddress) {
    btnAddAddress.addEventListener('click', event => {
      event.preventDefault();
      userAddress = addAddress();

      if (userAddress) {
        console.log(userAddress);
      }
      btnAddAddress.blur();
    });
  }
}

//---------- Validation and show Warning Input add Address-------------
function validAndShow(item) {
  const messageW = 'Warning!!! The input field must contain only letters!';
  const messageAll = 'Warning!!! The input field must not be empty and must contain only letters and numbers!';

  if (item.value !== '') {
    if (item.classList.contains('required_w')) {
      if (validationWS(item.value)) {
        removeWarning(item);
      } else {
        showWarningInputAddAddress(item, messageW);
      }
    } else if (item.classList.contains('required_wd')) {
      if (validationAll(item.value)) {
        removeWarning(item);
      } else {
        showWarningInputAddAddress(item, messageAll);
      }
    }
  } else {
    removeWarning(item);
  }
}

function removeWarning(item) {
  const blockWarning = item.parentElement.querySelector('.payment__warning');

  if (item.classList.contains('payment__form-add-address-input_warning')) {
    item.classList.remove('payment__form-add-address-input_warning');
  }

  if (blockWarning.classList.contains('payment__warning_warning')) {
    blockWarning.innerHTML = '';
    blockWarning.classList.remove('payment__warning_warning');
    blockWarning.style.display = 'none';
  }
}
