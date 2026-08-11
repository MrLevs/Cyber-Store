'use strict';
import { controlPayment } from './module/control-payment'; // Toggle Payment
import { getAddress } from './module/get-address'; // get Address LocalStorage
import { editAddress } from './module/edit-address'; // edit Address card
import { openCloseModalAddress } from './module/open-close-modal-address'; // Open Close Modal Address
import { addUserAddress } from './module/add-user-address/add-user-address'; // Add User Address
import { selectDateDelivery } from './module/select-date-delivery'; // Select Date Delivery
import { inputPaymentCards } from './module/input-payment-cards/input-payment-cards'; // Input Payment Cards
import { toggleCards } from './module/toggle-cards'; // Toggle Cards

export function payment() {
  // Get Address LocalStorage
  getAddress();

  // edit Address card
  editAddress();

  // Open Close Modal Address
  openCloseModalAddress();

  // Add User Address
  addUserAddress();

  // Select Date Delivery
  selectDateDelivery();

  // Toggle Cards
  toggleCards();

  // Input Payment Cards
  inputPaymentCards();

  // Toggle Payment
  controlPayment();
}
