'use strict';

import { openCloseModalAddress } from './module/open-close-modal-address'; // Open Close Modal Address
import { addAddress } from './module/add-address'; // Add Address

export function addNewAddress() {
  const btnAddAddress = document.querySelector('#btn-add-address');

  if (btnAddAddress) {
    btnAddAddress.addEventListener('click', event => {
      event.preventDefault();
      addAddress();
    });
  }

  // Open Close Modal Address
  openCloseModalAddress();
}
