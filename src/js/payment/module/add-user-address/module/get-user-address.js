'use strict';

import { showWarningInputAddAddress } from '../../../../warning';

export function getUserAddress() {
  const message = 'Warning!!! The field must be filled in correctly and cannot be left blank!';
  const bangeAddressInput = document.querySelector('#form-add-address-bange');
  const titleAddressInput = document.querySelector('#form-add-address-title');
  const postcodeAddressInput = document.querySelector('#form-add-address-postcode');
  const cityAddressInput = document.querySelector('#form-add-address-city');
  const streetAddressInput = document.querySelector('#form-add-address-street');
  const apartmentAddressInput = document.querySelector('#form-add-address-apartment');
  const phoneAddressInput = document.querySelector('#form-add-address-telephone');
  let bangeAddress = bangeAddressInput.value.trim().toLowerCase();
  let titleAddress = titleAddressInput.value.trim().toLowerCase();
  let postcodeAddress = postcodeAddressInput.value.trim();
  let cityAddress = cityAddressInput.value.trim().toLowerCase();
  let streetAddress = streetAddressInput.value.trim().toLowerCase();
  let apartmentAddress = apartmentAddressInput.value.trim();
  let phoneAddress = phoneAddressInput.value.trim();
  let userAddress = {};

  if (bangeAddress === '' || bangeAddressInput.classList.contains('payment__form-add-address-input_warning')) {
    showWarningInputAddAddress(bangeAddressInput, message);
  } else {
    userAddress.bange = bangeAddress;
  }

  if (titleAddress === '' || titleAddressInput.classList.contains('payment__form-add-address-input_warning')) {
    showWarningInputAddAddress(titleAddressInput, message);
  } else {
    userAddress.title = titleAddress;
  }

  if (postcodeAddress === '' || postcodeAddressInput.classList.contains('payment__form-add-address-input_warning')) {
    showWarningInputAddAddress(postcodeAddressInput, message);
  } else {
    userAddress.postcode = postcodeAddress;
  }

  if (cityAddress === '' || cityAddressInput.classList.contains('payment__form-add-address-input_warning')) {
    showWarningInputAddAddress(cityAddressInput, message);
  } else {
    userAddress.city = cityAddress;
  }

  if (streetAddress === '' || streetAddressInput.classList.contains('payment__form-add-address-input_warning')) {
    showWarningInputAddAddress(streetAddressInput, message);
  } else {
    userAddress.street = streetAddress;
  }

  if (apartmentAddress !== '') {
    userAddress.apartment = apartmentAddress;
  }

  if (phoneAddress === '' || phoneAddressInput.classList.contains('payment__form-add-address-input_warning')) {
    showWarningInputAddAddress(phoneAddressInput, message);
  } else {
    userAddress.phone = phoneAddress;
  }

  if (
    userAddress.bange !== undefined &&
    userAddress.title !== undefined &&
    userAddress.postcode !== undefined &&
    userAddress.city !== undefined &&
    userAddress.street !== undefined &&
    userAddress.phone !== undefined
  ) {
    return userAddress;
  }
}
