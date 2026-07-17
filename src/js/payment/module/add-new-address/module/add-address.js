'use strict';

export function addAddress() {
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
    showWarningInput(bangeAddressInput);
  } else {
    userAddress.bange = bangeAddress;
  }

  if (titleAddress === '') {
    showWarningInput(titleAddressInput);
  } else {
    userAddress.title = titleAddress;
  }

  if (postcodeAddress === '') {
    showWarningInput(postcodeAddressInput);
  } else {
    userAddress.postcode = postcodeAddress;
  }

  if (cityAddress === '') {
    showWarningInput(cityAddressInput);
  } else {
    userAddress.city = cityAddress;
  }

  if (streetAddress === '') {
    showWarningInput(streetAddressInput);
  } else {
    userAddress.street = streetAddress;
  }

  if (apartmentAddress === '') {
    userAddress.apartmentAddress = 'not specified';
  } else {
    userAddress.apartmentAddress = apartmentAddress;
  }

  if (telephoneAddress === '') {
    showWarningInput(telephoneAddressInput);
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

function showWarningInput(input) {
  const container = input.parentNode.querySelector('.payment__warning');
  const span = document.createElement('span');
  span.setAttribute('role', 'alert');
  span.className = 'form-search__warning';
  span.textContent = 'Warning!!! The field must be filled in!';

  container.innerHTML = '';
  input.classList.add('payment__form-add-address-input_warning');
  container.append(span);
  container.classList.add('payment__warning_warning');
  container.style.display = 'block';
}
