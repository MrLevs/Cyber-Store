'use strict';

import { showWarningInputAddAddress } from '../../../../warning';

export function addAddress() {
  const message = 'Warning!!! The field must be filled in!';
  const bangeAddressInput = document.querySelector('#form-add-address-bange');
  const titleAddressInput = document.querySelector('#form-add-address-title');
  const postcodeAddressInput = document.querySelector('#form-add-address-postcode');
  const cityAddressInput = document.querySelector('#form-add-address-city');
  const streetAddressInput = document.querySelector('#form-add-address-street');
  const apartmentAddressInput = document.querySelector('#form-add-address-apartment');
  const telephoneAddressInput = document.querySelector('#form-add-address-telephone');
  let bangeAddress = bangeAddressInput.value.trim().toLowerCase();
  let titleAddress = titleAddressInput.value.trim().toLowerCase();
  let postcodeAddress = postcodeAddressInput.value.trim();
  let cityAddress = cityAddressInput.value.trim().toLowerCase();
  let streetAddress = streetAddressInput.value.trim().toLowerCase();
  let apartmentAddress = apartmentAddressInput.value.trim();
  let telephoneAddress = telephoneAddressInput.value.trim();
  let userAddress = {};

  if (bangeAddress === '') {
    showWarningInputAddAddress(bangeAddressInput, message);
  } else {
    userAddress.bange = bangeAddress;
  }

  if (titleAddress === '') {
    showWarningInputAddAddress(titleAddressInput, message);
  } else {
    userAddress.title = titleAddress;
  }

  if (postcodeAddress === '') {
    showWarningInputAddAddress(postcodeAddressInput, message);
  } else {
    userAddress.postcode = postcodeAddress;
  }

  if (cityAddress === '') {
    showWarningInputAddAddress(cityAddressInput, message);
  } else {
    userAddress.city = cityAddress;
  }

  if (streetAddress === '') {
    showWarningInputAddAddress(streetAddressInput, message);
  } else {
    userAddress.street = streetAddress;
  }

  if (apartmentAddress === '') {
    userAddress.apartmentAddress = 'not specified';
  } else {
    userAddress.apartmentAddress = apartmentAddress;
  }

  if (telephoneAddress === '') {
    showWarningInputAddAddress(telephoneAddressInput, message);
  } else {
    userAddress.telephone = telephoneAddress;
  }

  if (
    userAddress.bange !== undefined &&
    userAddress.title !== undefined &&
    userAddress.postcode !== undefined &&
    userAddress.city !== undefined &&
    userAddress.street !== undefined &&
    userAddress.telephone !== undefined
  ) {
    return userAddress;
  }
}
