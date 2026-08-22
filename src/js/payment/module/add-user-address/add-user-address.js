'use strict';

import { validAndShow } from './module/valid-and-show'; // Validation and Show Warning
import { getUserAddress } from './module/get-user-address'; // Get Usre Address
import { createUserAddress } from './module/create-user-address'; // Create User Address Block
import { showWarningInput } from '../../../warning'; // Show Warning Input Address

export function addUserAddress() {
  const modalAddress = document.querySelector('#dialog-address');
  const inputModalAddress = document.querySelectorAll('.payment__form-add-address-input');
  const btnAddAddress = document.querySelector('#btn-add-address');
  const btnEditAddress = document.querySelector('#btn-edit-address');

  if (btnEditAddress) {
    btnEditAddress.style.display = 'none';
  }

  let userAddress;

  if (inputModalAddress.length > 0) {
    inputModalAddress.forEach(item => {
      item.addEventListener('input', () => {
        if (item.name === 'postcode' || item.name === 'apartment') {
          item.value = item.value.replace(/\D/g, '');
        } else if (item.type === 'tel') {
          item.value = item.value.replace(/^(?!\+)\D+|(?!^)\D+/g, '');
        }
        validAndShow(item);
      });
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
        showWarningInput(inputBadge, message);
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

  if (userAddressCollection && userAddressCollection.length > 0) {
    for (let i = 0; i < userAddressCollection.length; i++) {
      if (userAddressCollection[i].badge === userAddress.badge) {
        return true;
      }
    }
  } else {
    return undefined;
  }
}
