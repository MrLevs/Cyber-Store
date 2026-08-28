'use strict';

import { validationWS, validationSms } from '../../../../validation-value'; // Validation Input
import { showWarningInput, removeWarning } from '../../../../warning'; // Show and Remove Warning Input add Address

export function validCommentInput(item) {
  const messageW = 'Warning!!! The input field must contain only letters!';
  const messageSms = 'Warning!!! The field must contain only letters, numbers and punctuation marks!';

  if (item.value !== '') {
    if (item.classList.contains('required_w')) {
      if (validationWS(item.value)) {
        if (item.classList.contains('warning__input')) {
          removeWarning(item);
        }
      } else {
        showWarningInput(item, messageW);
      }
    } else if (item.classList.contains('required_sms')) {
      if (validationSms(item.value)) {
        if (item.classList.contains('warning__input')) {
          removeWarning(item);
        }
      } else {
        showWarningInput(item, messageSms);
      }
    }
  } else {
    if (item.classList.contains('warning__input')) {
      removeWarning(item);
    }
  }
}
