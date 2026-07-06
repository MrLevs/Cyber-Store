'use strict';

export function addAddress() {
  let bangeAddress = document.querySelector('#form-add-address-bange').value.trim().toLowerCase();
  let titleAddress = document.querySelector('#form-add-address-title').value.trim().toLowerCase();
  let postcodeAddress = document.querySelector('#form-add-address-postcode').value.trim();
  let cityAddress = document.querySelector('#form-add-address-city').value.trim().toLowerCase();
  let streetAddress = document.querySelector('#form-add-address-street').value.trim().toLowerCase();
  let apartmentAddress = document.querySelector('#form-add-address-apartment').value.trim();
  let telephoneAddress = document.querySelector('#form-add-address-telephone').value.trim();

  if (!apartmentAddress) {
    apartmentAddress = 'not specified';
  }

  let userAddress = {
    bange: bangeAddress,
    title: titleAddress,
    postcode: postcodeAddress,
    city: cityAddress,
    street: streetAddress,
    apartment: apartmentAddress,
    telephone: telephoneAddress,
  };
  console.log(userAddress);
}
