'use strict';

export function createUserAddress(obj) {
  const blockCardsAddress = document.querySelector('.payment__cards-address');
  const cardAddress = document.createElement('div');
  const checkbox = document.createElement('div');
  const formBlock = document.createElement('div');
  const inputAddress = document.createElement('input');
  const formInfo = document.createElement('div');
  const formBtns = document.createElement('div');
  const formBox = document.createElement('div');
  const formAddress = document.createElement('span');
  const formPhone = document.createElement('span');
  const formTitle = document.createElement('h2');
  const formMark = document.createElement('span');
  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');
  const svgEdit = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useEdit = document.createElementNS('http://www.w3.org/2000/svg', 'use');

  let badge = obj.badge;
  let title = obj.title;
  let postcode = obj.postcode;
  let city = obj.city;
  let street = obj.street;
  let apartment = obj?.apartment ? `Apartment ${obj.apartment}` : undefined;
  let phone = obj.phone;

  cardAddress.className = 'payment__card-address';
  checkbox.className = 'payment__checkbox';
  formBlock.className = 'payment__form-block';

  inputAddress.type = 'radio';
  inputAddress.id = `address-${badge}`;
  inputAddress.className = 'payment__input';
  inputAddress.name = 'address';
  inputAddress.value = `${badge}, ${postcode}, ${city}, ${street}${apartment ? `, ${apartment}` : ''}`;
  inputAddress.setAttribute(
    'aria-label',
    `${badge}, ${postcode}, ${city}, ${street}${apartment ? `, ${apartment}` : ''}`,
  );

  formInfo.className = 'payment__form-info';
  formBtns.className = 'payment__form-btns';
  formBox.className = 'payment__form-box';

  formAddress.className = 'payment__form-address';
  formAddress.textContent = `${badge}, ${postcode}, ${city}, ${street}${apartment ? `, ${apartment}` : ''}.`;
  formPhone.className = 'payment__form-phone';
  formPhone.textContent = `${phone}`;

  formTitle.className = 'payment__form-title';
  formTitle.textContent = `${title}`;
  formMark.className = 'payment__form-mark';
  formMark.textContent = `${badge}`;

  btnEdit.type = 'button';
  btnEdit.className = 'payment__form-btn';
  btnEdit.setAttribute('aria-label', 'edit');
  btnDelete.type = 'button';
  btnDelete.className = 'payment__form-btn btn-delete';
  btnDelete.setAttribute('aria-label', 'delete');

  svgEdit.classList.add('payment__form-svg');
  svgEdit.setAttribute('width', '18');
  svgEdit.setAttribute('height', '18');
  svgEdit.setAttribute('viewBox', '0 0 18 18');
  useEdit.setAttribute('href', '/images/sprite-icon.svg#edit');

  formBox.append(formTitle, formMark);
  formInfo.append(formBox, formAddress, formPhone);

  svgEdit.append(useEdit);
  btnEdit.append(svgEdit);
  formBtns.append(btnEdit, btnDelete);

  checkbox.append(inputAddress);
  formBlock.append(formInfo, formBtns);
  cardAddress.append(checkbox, formBlock);

  if (blockCardsAddress) {
    blockCardsAddress.append(cardAddress);
  }
}
