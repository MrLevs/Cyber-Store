'use strict';

import { validationAll, validationWS, validationNumber } from '../../../../validation-value'; // Validation Input add Address
import { showWarningInputAddAddress } from '../../../../warning'; // Show Warning Input add Address

export function validAndShow(item) {
  const messageW = 'Warning!!! The input field must contain only letters!';
  const messageAll = 'Warning!!! The input field must not be empty and must contain only letters and numbers!';

  if (item.value !== '') {
    if (item.classList.contains('required_w')) {
      if (validationWS(item.value)) {
        if (item.classList.contains('payment__form-add-address-input_warning')) {
          removeWarning(item);
        }
      } else {
        showWarningInputAddAddress(item, messageW);
      }
    } else if (item.classList.contains('required_wd')) {
      if (validationAll(item.value)) {
        if (item.classList.contains('payment__form-add-address-input_warning')) {
          removeWarning(item);
        }
      } else {
        showWarningInputAddAddress(item, messageAll);
      }
    } else if (item.classList.contains('required_postcode')) {
      if (item.classList.contains('payment__form-add-address-input_warning')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 6);
    } else if (item.classList.contains('required_apart')) {
      if (item.classList.contains('payment__form-add-address-input_warning')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 4);
    } else if (item.classList.contains('required_tel')) {
      if (item.classList.contains('payment__form-add-address-input_warning')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 11);
    }
  } else {
    if (item.classList.contains('payment__form-add-address-input_warning')) {
      removeWarning(item);
    }
  }
}

function removeWarning(item) {
  const blockWarning = item.parentElement.querySelector('.payment__warning');

  if (item.classList.contains('payment__form-add-address-input_warning')) {
    item.classList.remove('payment__form-add-address-input_warning');
  }

  if (blockWarning && blockWarning.classList.contains('payment__warning_warning')) {
    blockWarning.innerHTML = '';
    blockWarning.classList.remove('payment__warning_warning');
    blockWarning.style.display = 'none';
  }
}
