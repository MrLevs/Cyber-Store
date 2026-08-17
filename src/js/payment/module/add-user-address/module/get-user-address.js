'use strict';

import { showWarningInput } from '../../../../warning'; // Show Warning Input
import { strUpCase } from '../../../../string-up-case'; // String UpperCase

export function getUserAddress() {
  const message = 'Warning!!! The field must be filled in correctly and cannot be left blank!';
  const badgeAddressInput = document.querySelector('#form-add-address-badge');
  const titleAddressInput = document.querySelector('#form-add-address-title');
  const postcodeAddressInput = document.querySelector('#form-add-address-postcode');
  const cityAddressInput = document.querySelector('#form-add-address-city');
  const streetAddressInput = document.querySelector('#form-add-address-street');
  const apartmentAddressInput = document.querySelector('#form-add-address-apartment');
  const phoneAddressInput = document.querySelector('#form-add-address-telephone');
  let badgeAddress = badgeAddressInput.value.replace(/\s+/g, ' ').trim();
  let titleAddress = titleAddressInput.value.replace(/\s+/g, ' ').trim();
  let postcodeAddress = postcodeAddressInput.value.trim();
  let cityAddress = cityAddressInput.value.replace(/\s+/g, ' ').trim();
  let streetAddress = streetAddressInput.value.replace(/\s+/g, ' ').trim();
  let apartmentAddress = apartmentAddressInput.value.trim();
  let phoneAddress = phoneAddressInput.value.trim();
  let userAddress = {};

  if (badgeAddress === '' || badgeAddress === '-' || badgeAddressInput.classList.contains('warning__input')) {
    showWarningInput(badgeAddressInput, message);
  } else {
    userAddress.badge = strUpCase(badgeAddress);
  }

  if (titleAddress === '' || titleAddress === '-' || titleAddressInput.classList.contains('warning__input')) {
    showWarningInput(titleAddressInput, message);
  } else {
    userAddress.title = strUpCase(titleAddress);
  }

  if (postcodeAddress === '' || postcodeAddressInput.classList.contains('warning__input')) {
    showWarningInput(postcodeAddressInput, message);
  } else {
    userAddress.postcode = postcodeAddress;
  }

  if (cityAddress === '' || cityAddress === '-' || cityAddressInput.classList.contains('warning__input')) {
    showWarningInput(cityAddressInput, message);
  } else {
    userAddress.city = strUpCase(cityAddress);
  }

  if (streetAddress === '' || streetAddress === '-' || streetAddressInput.classList.contains('warning__input')) {
    showWarningInput(streetAddressInput, message);
  } else {
    userAddress.street = strUpCase(streetAddress);
  }

  if (apartmentAddress !== '') {
    userAddress.apartment = apartmentAddress;
  }

  if (phoneAddress === '' || phoneAddressInput.classList.contains('warning__input')) {
    showWarningInput(phoneAddressInput, message);
  } else {
    userAddress.phone = phoneAddress;
  }

  if (
    userAddress.badge !== undefined &&
    userAddress.title !== undefined &&
    userAddress.postcode !== undefined &&
    userAddress.city !== undefined &&
    userAddress.street !== undefined &&
    userAddress.phone !== undefined
  ) {
    return userAddress;
  }
}
