'use strict';

import { validAndShow } from './module/valid-and-show'; // Validation and Show Warning
import { getUserAddress } from './module/get-user-address'; // Get Usre Address
import { createUserAddress } from './module/create-user-address'; // Create User Address Block
import { showWarningInputAddAddress } from '../../../warning'; // Show Warning Input Address

export function addUserAddress() {
  const modalAddress = document.querySelector('#dialog-address');
  const inputModalAddress = document.querySelectorAll('.payment__form-add-address-input');
  const btnAddAddress = document.querySelector('#btn-add-address');
  const btnEditAddress = document.querySelector('#btn-edit-address');

  btnEditAddress.style.display = 'none';

  let userAddress;

  if (inputModalAddress.length > 0) {
    inputModalAddress.forEach(item => {
      item.addEventListener('input', () => {
        validAndShow(item);
      });

      if (item.type === 'number') {
        item.addEventListener('keydown', event => {
          if (event.code === 'KeyE' || event.code === 'Minus') {
            event.preventDefault();
          }
        });
      }
    });
  }

  if (btnAddAddress) {
    btnAddAddress.addEventListener('click', addAddress);
    btnAddAddress.addEventListener('keydown', addAddressEnter);
  }

  function addAddress(event) {
    event.preventDefault();
    userAddress = getUserAddress();

    if (userAddress) {
      let doubleVal = addressMatching(userAddress);
      if (doubleVal) {
        const inputBadge = modalAddress.querySelector('#form-add-address-badge');
        let message = 'It already exists!';
        showWarningInputAddAddress(inputBadge, message);
        btnAddAddress.blur();
      } else {
        let userAddressCollection = JSON.parse(localStorage.getItem('address'));

        if (userAddressCollection) {
          userAddressCollection.push(userAddress);
          localStorage.setItem('address', JSON.stringify(userAddressCollection));
        } else {
          localStorage.setItem('address', JSON.stringify([userAddress]));
        }

        createUserAddress(userAddress);
        inputModalAddress.forEach(item => {
          item.value = '';
        });
        document.body.classList.remove('_lock');
        modalAddress.close();
      }
    } else {
      btnAddAddress.blur();
    }
  }

  function addAddressEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();

      addAddress(event);
    }
  }
}

// match check LocalStorage
function addressMatching(userAddress) {
  let userAddressCollection = JSON.parse(localStorage.getItem('address'));

  if (userAddressCollection) {
    if (userAddressCollection.length > 0) {
      for (let i = 0; i < userAddressCollection.length; i++) {
        if (userAddressCollection[i].badge === userAddress.badge) {
          return true;
        }
      }
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}
