'use strict';

import { createUserAddress } from './add-user-address/module/create-user-address'; // Create User Address card
import { getUserAddress } from './add-user-address/module/get-user-address'; // Get User Address;
import { showWarningInput } from '../../warning'; // Show Warning Input Address

export function editAddress() {
  const blockAddressCard = document.querySelector('.payment__cards-address');
  const modalAddress = document.querySelector('#dialog-address');
  const inputsAddress = document.querySelectorAll('.payment__form-add-address-input');
  const btnCloseModalAddress = document.querySelector('#close-dialog-address'); // Btn Close Modal Address
  const btnAddAddress = document.querySelector('#btn-add-address'); // BtnAddAddress from dialogAddress
  const btnEditAddress = document.querySelector('#btn-edit-address'); // BtnEditAddress from dialogAddress
  // let addressAll = JSON.parse(localStorage.getItem('address'));
  let address = {};

  if (blockAddressCard) {
    blockAddressCard.addEventListener('click', event => {
      if (event.target.closest('.btn-edit')) {
        event.preventDefault();
        getValueAddressCard(event);
      } else if (event.target.closest('.btn-delete')) {
        event.preventDefault();
        deleteAddressCard(event);
      }
    });

    blockAddressCard.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        if (event.target.closest('.btn-edit')) {
          event.preventDefault();
          getValueAddressCard(event);
        } else if (event.target.closest('.btn-delete')) {
          event.preventDefault();
          deleteAddressCard(event);
        }
      }
    });
  }

  //----- BtnEditAddress from dialogAddress--------
  if (btnEditAddress) {
    btnEditAddress.addEventListener('click', () => {
      editAddressCard();
    });

    btnEditAddress.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        editAddressCard();
      }
    });
  }

  //---- Get Value Address Card---------------------
  function getValueAddressCard(event) {
    const badgeAddress = event.target.closest('.btn-edit').dataset.address;
    let addressAll = JSON.parse(localStorage.getItem('address'));

    btnCloseModalAddress.classList.add('payment__form-add-address-close_edit');
    btnAddAddress.style.display = 'none';
    btnEditAddress.style.display = 'block';

    for (let i = 0; i < addressAll.length; i++) {
      if (addressAll[i].badge === badgeAddress) {
        address.item = addressAll[i];
        address.index = i;
        break;
      }
    }

    modalAddress.showModal();
    inputsAddress.forEach(item => {
      switch (item.name) {
        case 'badge':
          item.value = address.item.badge;
          break;
        case 'title':
          item.value = address.item.title;
          break;
        case 'postcode':
          item.value = address.item.postcode;
          break;
        case 'city':
          item.value = address.item.city;
          break;
        case 'street':
          item.value = address.item.street;
          break;
        case 'apartment':
          item.value = address.item?.apartment ?? '';
          break;
        case 'phone':
          item.value = address.item.phone;
          break;
      }
    });
  }

  //-----Delete Address Card----------------
  function deleteAddressCard(event) {
    const badgeAddress = event.target.closest('.btn-delete').dataset.address;
    let addressAll = JSON.parse(localStorage.getItem('address'));

    for (let i = 0; i < addressAll.length; i++) {
      if (addressAll[i].badge === badgeAddress) {
        address.item = addressAll[i];
        address.index = i;
        break;
      }
    }

    addressAll.splice(address.index, 1);
    blockAddressCard.innerHTML = '';
    addressAll.forEach(item => {
      createUserAddress(item);
    });

    localStorage.setItem('address', JSON.stringify(addressAll));
  }

  //-----Edit Address Card-------------------
  function editAddressCard() {
    let newAddress = getUserAddress();
    let addressAll = JSON.parse(localStorage.getItem('address'));

    if (newAddress) {
      let addressAllNotEditElem = addressAll.filter((item, index) => {
        if (index !== address.index) {
          return item;
        }
      });
      let doubleVal;

      for (let i = 0; i < addressAllNotEditElem.length; i++) {
        if (addressAllNotEditElem[i].badge === newAddress.badge) {
          doubleVal = true;
          break;
        }
      }

      if (doubleVal) {
        const inputBadge = modalAddress.querySelector('#form-add-address-badge');
        let message = 'It already exists!';
        showWarningInput(inputBadge, message);
        btnEditAddress.blur();
      } else {
        address.item.badge = newAddress.badge;
        address.item.title = newAddress.title;
        address.item.postcode = newAddress.postcode;
        address.item.city = newAddress.city;
        address.item.street = newAddress.street;
        address.item.apartment = newAddress.apartment;
        address.item.phone = newAddress.phone;

        addressAll.splice(address.index, 1, address.item);
        blockAddressCard.innerHTML = '';
        addressAll.forEach(item => {
          createUserAddress(item);
        });

        inputsAddress.forEach(item => {
          item.value = '';
        });

        btnCloseModalAddress.classList.remove('payment__form-add-address-close_edit');
        document.body.classList.remove('_lock');
        modalAddress.close();
        localStorage.setItem('address', JSON.stringify(addressAll));
      }
    } else {
      btnEditAddress.blur();
    }
  }
}
