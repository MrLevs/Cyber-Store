'use strict';

import { addAddress } from './module/add-address'; // Add Address

export function addNewAddress() {
  const btnAddAddress = document.querySelector('#btn-add-address');
  let dataAddress;

  if (btnAddAddress) {
    btnAddAddress.addEventListener('click', event => {
      event.preventDefault();
      dataAddress = addAddress();
      console.log(dataAddress);
    });
  }
}
