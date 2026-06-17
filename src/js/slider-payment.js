'use strict';

export function sliderPayment() {
  const paymentSteps = document.querySelectorAll('.payment__step');
  const paymentSlides = document.querySelectorAll('.payment__info-box');
  const btnBack = document.querySelector('#btn-back');
  const btnNext = document.querySelector('#btn-next');
  const btnPay = document.querySelector('#btn-pay');

  paymentSteps.forEach(item => {
    if (item.dataset.step === 'address') {
      item.classList.add('payment__step_active');
    }
  });

  paymentSlides.forEach(item => {
    if (item.dataset.payment !== 'address') {
      item.classList.add('payment__info-box_disabled');
    }
  });

  btnPay.classList.add('payment__btn_disabled');

  if (btnBack || btnNext || btnPay) {
    btnBack.addEventListener('click', stepBack);
    btnNext.addEventListener('click', stepNext);
  }

  function stepBack(event) {
    event.preventDefault();
  }

  function stepNext(event) {
    event.preventDefault();
    for (let i = 0; i < paymentSlides.length; i++) {
      if (paymentSlides[i].classList.contains('payment__info-box_disabled')) {
        switch (paymentSlides[i].dataset.payment) {
          case 'address':
            paymentSlides.forEach(item => {
              if (item.classList.contains('payment__info-box_disabled')) {
                item.classList.remove('payment__info-box_disabled');
              }
              if (item.dataset.payment !== 'shipping') {
                item.classList.add('payment__info-box_disabled');
              }
            });
            break;
          case 'shipping':
            paymentSlides.forEach(item => {
              if (item.classList.contains('payment__info-box_disabled')) {
                item.classList.remove('payment__info-box_disabled');
              }
              if (item.dataset.payment !== 'pay') {
                item.classList.add('payment__info-box_disabled');
              }
            });
            break;
        }
      }
      break;
    }
  }
}
