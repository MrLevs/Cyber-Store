'use strict';

import { showWarningInput } from '../../warning'; // Show Warning Input

export function getDataPay() {
  const message = 'Warning!!! The field must be filled in correctly and cannot be left blank!';
  const messageNum = 'Warning!!! The field must contain 16 digits!';
  const messageDate = 'Warning!!! The field must contain 4 digits!';
  const messageCvv = 'Warning!!! The field must contain 3 digits!';
  const inputAddress = document.querySelector('input[name="address"]:checked');
  const inputShipping = document.querySelector('input[name="shipping"]:checked');
  const cardType = document.querySelector('.payment__form-button_active').value;
  const inputPaymentAll = document.querySelectorAll('.payment__form-payment-input');
  const sameAsBillingAddress = document.querySelector('#check-address').checked;
  const addressAll = JSON.parse(localStorage.getItem('address'));
  let address = addressAll.filter(item => item.badge === inputAddress.value);
  let inputPaymentCard = Array.from(inputPaymentAll).filter(item => item.disabled === false);
  let cardholderName;
  let cardNumber;
  let cardDate;
  let cardCvv;
  let dataUserPayment = {};

  inputPaymentCard.forEach(item => {
    if (!item.classList.contains('warning__input')) {
      if (item.value !== '') {
        if (item.name === 'cardholder-name') {
          cardholderName = item.value.replace(/\s+/g, ' ').trim();
        } else if (item.name === 'card-number') {
          if (item.value.length < 16) {
            showWarningInput(item, messageNum);
          } else {
            cardNumber = item.value;
          }
        } else if (item.name === 'card-expdate') {
          if (item.value.length < 4) {
            showWarningInput(item, messageDate);
          } else {
            cardDate = item.value;
          }
        } else if (item.name === 'card-cvv') {
          if (item.value.length < 3) {
            showWarningInput(item, messageCvv);
          } else {
            cardCvv = item.value;
          }
        }
      } else {
        showWarningInput(item, message);
      }
    }
  });

  if (inputAddress && inputShipping && cardType && cardholderName && cardNumber && cardDate && cardCvv) {
    dataUserPayment.address = address[0];
    if (inputShipping.value === 'select date') {
      const userDate = document.querySelector('#select-date').value;
      dataUserPayment.shipping = {};
      dataUserPayment.shipping.shipping = inputShipping.value;
      dataUserPayment.shipping.delivery = userDate;
    } else {
      dataUserPayment.shipping = inputShipping.value;
    }

    dataUserPayment.card = {};
    dataUserPayment.card.cardData = {};
    dataUserPayment.card.cardType = cardType;
    dataUserPayment.card.cardData.cardholderName = cardholderName.toLowerCase();
    dataUserPayment.card.cardData.cardNumber = cardNumber;
    dataUserPayment.card.cardData.cardDate = cardDate;
    dataUserPayment.card.cardData.cardCvv = cardCvv;

    if (sameAsBillingAddress === true) {
      dataUserPayment.sameAsBillingAddress = 'Yes';
    } else {
      dataUserPayment.sameAsBillingAddress = 'No';
    }
    return dataUserPayment;
  }
}
