'use strict';

import { validationWS, validationNumber } from '../../../../validation-value'; // Validation Input Payment
import { showWarningInput, removeWarning } from '../../../../warning'; // Show and Remove Warning Input Payment

export function validAndShowAlert(item) {
  const messageW = 'Warning!!! The input field must contain only letters!';

  if (item.value !== '') {
    if (item.classList.contains('required_w')) {
      if (validationWS(item.value)) {
        if (item.classList.contains('warning__input')) {
          removeWarning(item);
        }
      } else {
        showWarningInput(item, messageW);
      }
    } else if (item.classList.contains('required_card-num')) {
      if (item.classList.contains('warning__input')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 16);
    } else if (item.classList.contains('required_card-date')) {
      if (item.classList.contains('warning__input')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 4);
    } else if (item.classList.contains('required_card-cvv')) {
      if (item.classList.contains('warning__input')) {
        removeWarning(item);
      }
      item.value = validationNumber(item.value, 3);
    }
  } else {
    if (item.classList.contains('warning__input')) {
      removeWarning(item);
    }
  }
}
