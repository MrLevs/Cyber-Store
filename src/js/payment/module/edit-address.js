'use strict';

export function editAddress() {
  const blockAddressCard = document.querySelector('.payment__cards-address');
  const modalAddress = document.querySelector('#dialog-address');
  const inputsAddress = modalAddress.querySelectorAll('.payment__form-add-address-input');
  const btnAddAddress = document.querySelector('#btn-add-address');
  const btnEditAddress = document.querySelector('#btn-edit-address');

  if (blockAddressCard) {
    blockAddressCard.addEventListener('click', event => {
      if (event.target.closest('.btn-edit')) {
        editAddressCard(event);
      } else if (event.target.closest('.btn-delete')) {
        deleteAddressCard();
      }
    });

    blockAddressCard.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        if (event.target.closest('.btn-edit')) {
          event.preventDefault();
          console.log('edit');
        } else if (event.target.closest('.btn-delete')) {
          event.preventDefault();
          console.log('delete');
        }
      }
    });
  }

  if (btnEditAddress) {
    btnEditAddress.addEventListener('click', () => {
      console.log('edit');
      //Доделать функцию, редактировать адрес!!!!
    });
  }

  function editAddressCard(event) {
    const badgeAddress = event.target.closest('.btn-edit').dataset.address;
    const addressAll = JSON.parse(localStorage.getItem('address'));
    let address;

    btnAddAddress.style.display = 'none';
    btnEditAddress.style.display = 'block';

    for (const item of addressAll) {
      if (item.badge === badgeAddress) {
        address = item;
        break;
      }
    }

    modalAddress.showModal();
    inputsAddress.forEach(item => {
      switch (item.name) {
        case 'badge':
          item.value = address.badge;
          break;
        case 'title':
          item.value = address.title;
          break;
        case 'postcode':
          item.value = address.postcode;
          break;
        case 'city':
          item.value = address.city;
          break;
        case 'street':
          item.value = address.street;
          break;
        case 'apartment':
          item.value = address?.apartment;
          break;
        case 'phone':
          item.value = address.phone;
          break;
      }
    });

    console.log(address);
  }

  function deleteAddressCard() {
    console.log('delete');
  }
}
