'use strict';

export function getDataPay() {
  const inputPaymentAll = document.querySelectorAll('.payment__form-payment-input');
  let inputPaymentCard = Array.from(inputPaymentAll).filter(item => item.disabled === false && item.value);
  console.log(inputPaymentCard);
}
