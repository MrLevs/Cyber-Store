'use strict';

export function getDataPay() {
  const inputPaymentAll = document.querySelectorAll('.payment__form-payment-input');
  let inputPaymentCard = Array.from(inputPaymentAll).filter(item => item.disabled === false);

  console.log(inputPaymentCard);
  // проверка инпутов не должен содержать номер карты меньше чем 16 и тд!!!
}
