'use strict';

export function selectItemFilters(event, arrayFiltersValue, arrayItemsBatteryAll, arrayItemsDiagonalAll) {
  if (event.currentTarget.control.checked) {
    event.currentTarget.classList.remove('filters__label_active');
    if (event.currentTarget.control.value == 'battery-all') {
      selectAll(event.currentTarget, arrayItemsBatteryAll, arrayFiltersValue);
    } else if (event.currentTarget.control.value == 'diagonal-all') {
      selectAll(event.currentTarget, arrayItemsDiagonalAll, arrayFiltersValue);
    } else {
      if (arrayItemsBatteryAll.includes(event.currentTarget)) {
        let buttonAll = event.currentTarget.parentNode.parentNode.querySelector('.button_all');
        buttonAll.classList.remove('filters__label_active');
        buttonAll.control.checked = false;
        arrayItemsBatteryAll.length = 0;
      }
      if (arrayItemsDiagonalAll.includes(event.currentTarget)) {
        let buttonAll = event.currentTarget.parentNode.parentNode.querySelector('.button_all');
        buttonAll.classList.remove('filters__label_active');
        buttonAll.control.checked = false;
        arrayItemsDiagonalAll.length = 0;
      }
      let filter = arrayFiltersValue.filter(elem => elem !== event.currentTarget.control.value);
      arrayFiltersValue.length = 0;
      arrayFiltersValue.push(...filter);
    }
  } else {
    event.currentTarget.classList.add('filters__label_active');
    if (event.currentTarget.control.value == 'battery-all') {
      selectAll(event.currentTarget, arrayItemsBatteryAll, arrayFiltersValue);
    } else if (event.currentTarget.control.value == 'diagonal-all') {
      selectAll(event.currentTarget, arrayItemsDiagonalAll, arrayFiltersValue);
    } else {
      arrayFiltersValue.push(event.currentTarget.control.value);
    }
  }
}

function selectAll(item, array, arrayFiltersValue) {
  let elemAll = Array.from(item.parentNode.parentNode.querySelectorAll('.filters__label')).filter(
    item => !item.classList.contains('button_all'),
  );
  elemAll.forEach(item => array.push(item));

  if (item.control.checked) {
    elemAll.forEach(item => {
      item.control.checked = false;
      item.classList.remove('filters__label_active');
      let filter = arrayFiltersValue.filter(val => val !== item.control.value);
      arrayFiltersValue.length = 0;
      arrayFiltersValue.push(...filter);
    });
  } else {
    elemAll.forEach(item => {
      item.control.checked = true;
      item.classList.add('filters__label_active');
      let filter = arrayFiltersValue.filter(val => val !== item.control.value);
      arrayFiltersValue.length = 0;
      arrayFiltersValue.push(...filter);
      arrayFiltersValue.push(item.control.value);
    });
  }
}
