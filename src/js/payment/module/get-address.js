'use strict';

import { createUserAddress } from './add-user-address/module/create-user-address'; // Create User Address Card

export function getAddress() {
  let userAddress = JSON.parse(localStorage.getItem('address'));

  if (userAddress) {
    if (userAddress.length > 0) {
      userAddress.forEach(item => {
        createUserAddress(item);
      });
    }
  }
}
