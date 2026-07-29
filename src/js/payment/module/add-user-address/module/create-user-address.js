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

  cardAddress.className = 'payment__card-address';
  checkbox.className = 'payment__checkbox';
  formBlock.className = 'payment__form-block';

  inputAddress.type = 'radio';
  inputAddress.id = `address-${obj.bange}`;
  inputAddress.className = 'payment__input';
  inputAddress.name = 'address';
  inputAddress.value = `${obj.bange} ${obj.city} ${obj.street} ${obj?.apartment ?? ''} ${obj.postcode}`;
  inputAddress.setAttribute(
    'aria-label',
    `${obj.bange} ${obj.city} ${obj.street} ${obj?.apartment ?? ''} ${obj.postcode}`,
  );

  formInfo.className = 'payment__form-info';
  formBtns.className = 'payment__form-btns';
  formBox.className = 'payment__form-box';

  formAddress.className = 'payment__form-address';
  formAddress.textContent = `${obj.bange} ${obj.city} ${obj.street} ${obj?.apartment ?? ''} ${obj.postcode}`;
  formPhone.className = 'payment__form-phone';
  formPhone.textContent = `${obj.phone}`;

  formTitle.className = 'payment__form-title';
  formTitle.textContent = `${obj.title}`;
  formMark.className = 'payment__form-mark';
  formMark.textContent = `${obj.bange}`;

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
