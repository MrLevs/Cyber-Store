'use strict';

import { validAndShowAlert } from './module/valid-and-show-alert'; // Validation Input Payment
import { showWarningInput } from '../../../warning'; // Show Warning Input Payment

export function inputPaymentCards() {
  const inputPaymentAll = document.querySelectorAll('.payment__form-payment-input');
  const messageNum = 'Warning!!! The field must contain 16 digits!';
  const messageDate = 'Warning!!! The field must contain 4 digits!';
  const messageCvv = 'Warning!!! The field must contain 4 digits!';

  if (inputPaymentAll.length > 0) {
    inputPaymentAll.forEach(item => {
      item.addEventListener('input', () => {
        validAndShowAlert(item);
      });

      if (item.type === 'number') {
        item.addEventListener('keydown', event => {
          if (
            event.code === 'KeyE' ||
            event.code === 'Minus' ||
            event.key === '+' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown'
          ) {
            event.preventDefault();
          }
        });

        item.addEventListener('focus', () => {
          item.addEventListener('wheel', cancelWheel);
        });

        item.addEventListener('blur', () => {
          item.removeEventListener('wheel', cancelWheel);

          if (item.classList.contains('required_card-num')) {
            if (item.value && item.value.length < 16) {
              showWarningInput(item, messageNum);
            }
          } else if (item.classList.contains('required_card-date')) {
            if (item.value && item.value.length < 4) {
              showWarningInput(item, messageDate);
            }
          } else if (item.classList.contains('required_card-cvv')) {
            if (item.value && item.value.length < 3) {
              showWarningInput(item, messageCvv);
            }
          }
        });
      }
    });
  }

  // Cancel Wheel Mouse
  function cancelWheel(event) {
    event.preventDefault();
  }
}
