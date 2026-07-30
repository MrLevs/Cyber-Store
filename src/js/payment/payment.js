'use strict';
import { togglePayment } from './module/toggle-payment'; // Toggle Payment
import { getAddress } from './module/get-address'; // get Address LocalStorage
import { openCloseModalAddress } from './module/open-close-modal-address'; // Open Close Modal Address
import { addUserAddress } from './module/add-user-address/add-user-address'; // Add User Address
import { selectDateDelivery } from './module/select-date-delivery'; // Select Date Delivery
import { toggleCards } from './module/toggle-cards'; // Toggle Cards

export function payment() {
  // Toggle Payment
  togglePayment();

  // Get Address LocalStorage
  getAddress();

  // Open Close Modal Address
  openCloseModalAddress();

  // Add User Address
  addUserAddress();

  // Select Date Delivery
  selectDateDelivery();

  // Toggle Cards
  toggleCards();
}
