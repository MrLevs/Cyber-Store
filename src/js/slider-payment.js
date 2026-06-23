'use strict';

export function sliderPayment() {
  const paymentSteps = document.querySelectorAll('.payment__step');
  const paymentOrder = document.querySelector('.payment__order');
  const paymentSlides = document.querySelectorAll('.payment__info-box');
  const inputAddressAll = document.querySelectorAll('input[name="address"]');
  const inputShippingAll = document.querySelectorAll('input[name="shipping"]');
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

  if (inputAddressAll.length > 0) {
    let tagNameAddress = 'input[name="address"]';
    inputAddressAll.forEach(item => {
      item.addEventListener('input', selectInputAddress);
    });

    function selectInputAddress() {
      selectPaymentInput(tagNameAddress);
    }
  }

  if (inputShippingAll.length > 0) {
    let tagNameShipping = 'input[name="shipping"]';
    inputShippingAll.forEach(item => {
      item.addEventListener('input', selectInputShipping);
    });

    function selectInputShipping() {
      selectPaymentInput(tagNameShipping);
    }
  }

  if (btnBack || btnNext || btnPay) {
    btnBack.addEventListener('click', stepBack);
    btnNext.addEventListener('click', stepNext);
  }

  //-----Step Back-------------
  function stepBack(event) {
    event.preventDefault();
    slideBack();
    toggleElement();
    event.target.blur();
  }

  //-----Step Next-------------
  function stepNext(event) {
    event.preventDefault();
    selectOrNot();
    event.target.blur();
  }

  //-----Select or Not---------
  function selectOrNot() {
    switch (currentIndex) {
      case 0: {
        let selectInputAddress = document.querySelector('input[name="address"]:checked');
        if (selectInputAddress) {
          slideNext();
          toggleElement();
        } else {
          let tagName = 'input[name="address"]';
          inputRequire(tagName);
        }
        break;
      }
      case 1: {
        let selectShipment = document.querySelector('input[name="shipping"]:checked');
        if (selectShipment) {
          slideNext();
          toggleElement();
        } else {
          let tagName = 'input[name="shipping"]';
          inputRequire(tagName);
        }
        break;
      }
      case 2:
        slideNext();
        toggleElement();
        break;
    }
  }

  //-----Slide Back-------------------------
  function slideBack() {
    if (currentIndex !== 0) {
      paymentSlides[currentIndex].classList.add('payment__info-box_disabled');
    }
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    if (paymentSlides[currentIndex].classList.contains('payment__info-box_disabled')) {
      paymentSlides[currentIndex].classList.remove('payment__info-box_disabled');
    }
  }

  //-----Slide Next-----------------------
  function slideNext() {
    if (currentIndex !== paymentSlides.length - 1) {
      paymentSlides[currentIndex].classList.add('payment__info-box_disabled');
    }

    currentIndex++;

    if (currentIndex < paymentSlides.length) {
      paymentSlides[currentIndex].classList.remove('payment__info-box_disabled');
    } else {
      currentIndex = paymentSlides.length - 1;
    }
  }

  //-----Toggle Element--------------------------
  function toggleElement() {
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
      btnNext.classList.add('payment__btn_disabled');
      btnPay.classList.remove('payment__btn_disabled');
    } else {
      if (!paymentOrder.classList.contains('payment__order_disabled')) {
        paymentOrder.classList.add('payment__order_disabled');
      }

      if (btnNext.classList.contains('payment__btn_disabled')) {
        btnNext.classList.remove('payment__btn_disabled');
      }

      if (!btnPay.classList.contains('payment__btn_disabled')) {
        btnPay.classList.add('payment__btn_disabled');
      }
    }
  }

  //-----Input Require--------------------------
  function inputRequire(tagName) {
    const inputAll = document.querySelectorAll(tagName);
    const blockAlertAll = document.querySelectorAll('.payment__alert');
    inputAll.forEach(item => {
      let parentBlock = item.parentNode;

      if (!item.classList.contains('payment__input_require')) {
        item.classList.add('payment__input_require');
      }

      if (blockAlertAll.length === 0) {
        createBlockAlert(parentBlock);
      }
    });
  }

  //-----Create Block Alert--------------------
  function createBlockAlert(elem) {
    const div = document.createElement('div');
    div.setAttribute('role', 'alert');
    div.className = 'payment__alert';
    div.textContent = 'Сheck the box';
    elem.append(div);
  }

  //----Select Address---------
  function selectPaymentInput(tagName) {
    const blockAlertAll = document.querySelectorAll('.payment__alert');
    const inputAll = document.querySelectorAll(tagName);

    if (blockAlertAll.length > 0) {
      blockAlertAll.forEach(item => {
        item.remove();
      });
    }

    if (inputAll.length > 0) {
      inputAll.forEach(item => {
        if (item.classList.contains('payment__input_require')) {
          item.classList.remove('payment__input_require');
        }
      });
    }
  }
}
