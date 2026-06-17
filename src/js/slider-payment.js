'use strict';

export function sliderPayment() {
  const paymentSteps = document.querySelectorAll('.payment__step');
  const paymentOrder = document.querySelector('.payment__order');
  const paymentSlides = document.querySelectorAll('.payment__info-box');
  const btnBack = document.querySelector('#btn-back');
  const btnNext = document.querySelector('#btn-next');
  const btnPay = document.querySelector('#btn-pay');
  let currentIndex = 0;

  paymentSteps.forEach(item => {
    if (item.dataset.step === currentIndex.toString()) {
      item.classList.add('payment__step_active');
    }
  });

  paymentSlides.forEach((item, index) => {
    if (index !== currentIndex) {
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
    if (currentIndex !== 0) {
      paymentSlides[currentIndex].classList.add('payment__info-box_disabled');
    }
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    paymentSlides[currentIndex].classList.remove('payment__info-box_disabled');

    toggleSteps();
  }

  function stepNext(event) {
    event.preventDefault();
    if (currentIndex !== paymentSlides.length - 1) {
      paymentSlides[currentIndex].classList.add('payment__info-box_disabled');
    }
    currentIndex++;

    if (currentIndex < paymentSlides.length) {
      paymentSlides[currentIndex].classList.remove('payment__info-box_disabled');
    } else {
      currentIndex = paymentSlides.length - 1;
    }

    toggleSteps();
  }

  function toggleSteps() {
    paymentSteps.forEach(item => {
      if (item.classList.contains('payment__step_active')) {
        item.classList.remove('payment__step_active');
      }
      if (item.dataset.step === currentIndex.toString()) {
        item.classList.add('payment__step_active');
      }
    });

    if (currentIndex === paymentSlides.length - 1) {
      paymentOrder.classList.remove('payment__order_disabled');
    } else {
      if (!paymentOrder.classList.contains('payment__order_disabled')) {
        paymentOrder.classList.add('payment__order_disabled');
      }
    }
  }
}
