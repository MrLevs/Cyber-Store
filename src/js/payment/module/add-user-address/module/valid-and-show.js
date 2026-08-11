'use strict';

import { validationAll, validationWS, validationNumber } from '../../../../validation-value'; // Validation Input add Address
import { showWarningInput, removeWarning } from '../../../../warning'; // Show and Remove Warning Input add Address

export function validAndShow(item) {
  const messageW = 'Warning!!! The input field must contain only letters!';
  const messageAll = 'Warning!!! The input field must not be empty and must contain only letters and numbers!';

  if (item.value !== '') {
    if (item.classList.contains('required_w')) {
      if (validationWS(item.value)) {
        if (item.classList.contains('warning__input')) {
          removeWarning(item);
        }
      } else {
        showWarningInput(item, messageW);
      }
    } else if (item.classList.contains('required_wd')) {
      if (validationAll(item.value)) {
        if (item.classList.contains('warning__input')) {
          removeWarning(item);
        }
      } else {
        showWarningInput(item, messageAll);
      }
    } else if (item.classList.contains('required_postcode')) {
      if (item.classList.contains('warning__input')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 6);
    } else if (item.classList.contains('required_apart')) {
      if (item.classList.contains('warning__input')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 4);
    } else if (item.classList.contains('required_tel')) {
      if (item.classList.contains('warning__input')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 11);
    }
  } else {
    if (item.classList.contains('warning__input')) {
      removeWarning(item);
    }
  }
}
