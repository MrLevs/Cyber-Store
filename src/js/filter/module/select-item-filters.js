'use strict';

export function selectItemFilters(event, arrayFiltersValue, arrayItemsBatteryAll, arrayItemsDiagonalAll) {
  const filterBattery = document.querySelector('#filter-battery');
  const filterScreenDiagonal = document.querySelector('#filter-screen-diagonal');
  const btnAllFilterBattery = filterBattery.querySelector('.button_all');
  const btnAllFilterScreenDiagonal = filterScreenDiagonal.querySelector('.button_all');

  const filterBatteryAll = Array.from(filterBattery.querySelectorAll('.filters__label')).filter(item => {
    if (!item.classList.contains('button_all')) {
      if (!item.classList.contains('filters__label_disabled')) {
        return item;
      }
    }
  });

  const filterScreenDiagonalAll = Array.from(filterScreenDiagonal.querySelectorAll('.filters__label')).filter(item => {
    if (!item.classList.contains('button_all')) {
      if (!item.classList.contains('filters__label_disabled')) {
        return item;
      }
    }
  });

  let targetValue = event.currentTarget.control.value;

  if (event.currentTarget.control.checked) {
    event.currentTarget.classList.remove('filters__label_active');
    if (targetValue === 'battery-all') {
      selectAll(event.currentTarget, arrayItemsBatteryAll, arrayFiltersValue);
    } else if (targetValue === 'diagonal-all') {
      selectAll(event.currentTarget, arrayItemsDiagonalAll, arrayFiltersValue);
    } else {
      if (arrayItemsBatteryAll.includes(targetValue)) {
        btnAllFilterBattery.classList.remove('filters__label_active');
        btnAllFilterBattery.control.checked = false;
        let filter = arrayItemsBatteryAll.filter(elem => elem !== targetValue);
        arrayItemsBatteryAll.length = 0;
        arrayItemsBatteryAll.push(...filter);
      }
      if (arrayItemsDiagonalAll.includes(targetValue)) {
        btnAllFilterScreenDiagonal.classList.remove('filters__label_active');
        btnAllFilterScreenDiagonal.control.checked = false;
        let filter = arrayItemsDiagonalAll.filter(elem => elem !== targetValue);
        arrayItemsDiagonalAll.length = 0;
        arrayItemsDiagonalAll.push(...filter);
      }
      let filter = arrayFiltersValue.filter(elem => elem !== targetValue);
      arrayFiltersValue.length = 0;
      arrayFiltersValue.push(...filter);
    }
  } else {
    event.currentTarget.classList.add('filters__label_active');
    if (targetValue === 'battery-all') {
      selectAll(event.currentTarget, arrayItemsBatteryAll, arrayFiltersValue);
    } else if (targetValue === 'diagonal-all') {
      selectAll(event.currentTarget, arrayItemsDiagonalAll, arrayFiltersValue);
    } else {
      arrayFiltersValue.push(targetValue);

      if (
        targetValue === '2499' ||
        targetValue === '2500-3999' ||
        targetValue === '4000-4499' ||
        targetValue === '4500-4999' ||
        targetValue === '5000-5999' ||
        targetValue === '6000'
      ) {
        arrayItemsBatteryAll.push(targetValue);
      }
      if (
        targetValue === '6.09' ||
        targetValue === '6.1-6.29' ||
        targetValue === '6.3-6.49' ||
        targetValue === '6.5-6.59' ||
        targetValue === '6.6-6.79' ||
        targetValue === '6.8'
      ) {
        arrayItemsDiagonalAll.push(targetValue);
      }

      if (
        arrayItemsBatteryAll.length === filterBatteryAll.length &&
        !btnAllFilterBattery.classList.contains('filters__label_active')
      ) {
        btnAllFilterBattery.classList.add('filters__label_active');
        btnAllFilterBattery.control.checked = true;
      }

      if (
        arrayItemsDiagonalAll.length === filterScreenDiagonalAll.length &&
        !btnAllFilterScreenDiagonal.classList.contains('filters__label_active')
      ) {
        btnAllFilterScreenDiagonal.classList.add('filters__label_active');
        btnAllFilterScreenDiagonal.control.checked = true;
      }
    }
  }
}

function selectAll(item, arrayAll, arrayFiltersValue) {
  let elemAll = Array.from(item.parentNode.parentNode.querySelectorAll('.filters__label')).filter(item => {
    if (!item.classList.contains('button_all')) {
      if (!item.classList.contains('filters__label_disabled')) {
        return item;
      }
    }
  });

  if (item.control.checked) {
    elemAll.forEach(item => {
      item.control.checked = false;
      item.classList.remove('filters__label_active');
      let filter = arrayFiltersValue.filter(val => val !== item.control.value);
      arrayFiltersValue.length = 0;
      arrayFiltersValue.push(...filter);
      arrayAll.length = 0;
    });
  } else {
    elemAll.forEach(item => {
      item.control.checked = true;
      item.classList.add('filters__label_active');
      let filter = arrayFiltersValue.filter(val => val !== item.control.value);
      arrayFiltersValue.length = 0;
      arrayFiltersValue.push(...filter);
      arrayFiltersValue.push(item.control.value);
      let filterArray = arrayAll.filter(val => val !== item.control.value);
      arrayAll.length = 0;
      arrayAll.push(...filterArray);
      arrayAll.push(item.control.value);
    });
  }
}
