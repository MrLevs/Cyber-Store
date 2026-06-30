'use strict';
import { togglePayment } from './module/toggle-payment'; // Toggle Payment
import { addNewAddress } from './module/add-new-address/add-new-address'; // Add New Address
import { selectDateDelivery } from './module/select-date-delivery'; // Select Date Delivery
import { toggleCards } from './module/toggle-cards'; // Toggle Cards

export function payment() {
  // Toggle Payment
  togglePayment();

  // Add New Address
  addNewAddress();

  // Select Date Delivery
  selectDateDelivery();

  // Toggle Cards
  toggleCards();
}
