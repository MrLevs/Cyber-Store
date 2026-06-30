'use strict';

export function selectDateDelivery() {
  const shippingInput = document.querySelectorAll('.shipping__input');
  const input = document.querySelector('#select-date');
  const label = document.querySelector('.payment__label-date');
  let calendarOpen = false;

  if (shippingInput.length > 0) {
    shippingInput.forEach(item => {
      item.addEventListener('input', selectDelivery);
    });
  }

  function selectDelivery(event) {
    const contentBlockAll = document.querySelectorAll('.payment__form-content');
    const contentBlock = event.target.parentNode.parentNode.querySelector('.payment__form-content');
    const selectDateLabel = event.target.parentNode.parentNode.querySelector('.payment__label-date');

    contentBlockAll.forEach(item => {
      if (item.classList.contains('payment__form-content_active')) {
        item.classList.remove('payment__form-content_active');
      }
    });

    if (selectDateLabel) {
      label.setAttribute('tabindex', '0');

      if (label || input) {
        input.addEventListener('change', selectDate);
        input.addEventListener('blur', selectDateBlur);
        label.addEventListener('click', showDate);
        label.addEventListener('keydown', pressEnter);
      }
    } else {
      label.setAttribute('tabindex', '-1');

      if (label || input) {
        input.removeEventListener('input', selectDate);
        input.removeEventListener('blur', selectDateBlur);
        label.removeEventListener('click', showDate);
        label.removeEventListener('keydown', pressEnter);
      }
    }

    if (event.target.checked) {
      contentBlock.classList.add('payment__form-content_active');
    }
  }

  function selectDate() {
    let value = input.value;

    if (calendarOpen === true) {
      label.classList.remove('payment__label-date_active');
      calendarOpen = false;
    }

    if (value) {
      label.textContent = value;
      label.classList.add('payment__label-date_disabled');
    } else {
      if (label.classList.contains('payment__label-date_disabled')) {
        label.classList.remove('payment__label-date_disabled');
      }
      label.textContent = 'Select Date';
    }
  }

  function selectDateBlur() {
    if (calendarOpen === true) {
      label.classList.remove('payment__label-date_active');
      calendarOpen = false;
    }
  }

  function showDate() {
    if (calendarOpen === false) {
      label.classList.add('payment__label-date_active');
      calendarOpen = true;
    }
    input.showPicker();
  }

  function pressEnter() {
    if (event.code === 'Enter') {
      event.preventDefault();
      showDate();
    }
  }
}
