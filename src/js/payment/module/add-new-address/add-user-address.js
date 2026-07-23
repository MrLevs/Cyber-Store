'use strict';

import { validAndShow } from './module/valid-and-show'; // Validation and Show Warning
import { getUserAddress } from './module/get-user-address'; // Get Usre Address

export function addUserAddress() {
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
      userAddress = getUserAddress();

      if (userAddress) {
        console.log(userAddress);
      }
      btnAddAddress.blur();
    });
  }
}
