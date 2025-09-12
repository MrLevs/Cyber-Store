'use strict';

import dataBase from './data-base'; //Data base

export default async function () {
  const data = await dataBase();
  console.log(data);
  const details = document.querySelectorAll('.filters__details');
  const label = document.querySelectorAll('.filters__label');

  const batteryAll = document.querySelector('.battery_all');
  const batteryLabel = document.querySelectorAll('.battery__label');

  const screenAll = document.querySelector('.screen-diagonal_all');
  const screenLabel = document.querySelectorAll('.screen-label');

  //----filters-btn Open || Close-------
  const filtersBtnOpen = document.querySelector('#filters-btn-open');
  const filtersBtnClose = document.querySelector('#filters-btn-close');
  const filtersMenu = document.querySelector('#filters-menu');

  filtersBtnOpen.addEventListener('click', menuFiltersOpen);
  filtersBtnClose.addEventListener('click', menuFiltersClose);

  function menuFiltersOpen() {
    document.body.classList.add('_lock');
    filtersMenu.classList.add('filters_active');
  }

  function menuFiltersClose() {
    document.body.classList.remove('_lock');
    filtersMenu.classList.remove('filters_active');
  }
  //-----------------------------

  let valueFilters = [];

  //----Open accordion---------
  details.forEach(item => {
    let summary = item.querySelector('.filters__summary');
    summary.addEventListener('click', function () {
      if (item.hasAttribute('open')) {
        item.classList.remove('filters__details_active');
      } else {
        item.classList.add('filters__details_active');
      }
    });
  });

  //----Select element-------
  label.forEach(item => {
    item.addEventListener('click', function () {
      if (this.control.checked) {
        item.classList.remove('filters__label_active');
        let valFilter = valueFilters.filter(val => val !== this.control.value);
        valueFilters = valFilter;
        console.log(valueFilters);
      } else {
        item.classList.add('filters__label_active');
        if (this.control.value !== 'all') {
          valueFilters.push(this.control.value);
          console.log(valueFilters);
        }
      }
      console.log(this.control.checked);
      console.log(this.control);
    });

    item.addEventListener('keydown', function (e) {
      if (e.code === 'Enter') {
        console.log(this.control.checked);
        if (this.control.checked) {
          item.classList.remove('filters__label_active');
          let valFilter = valueFilters.filter(val => val !== this.control.value);
          valueFilters = valFilter;
          this.control.checked = false;
          console.log(valueFilters);
        } else {
          item.classList.add('filters__label_active');
          valueFilters.push(this.control.value);
          console.log(valueFilters);
          this.control.checked = true;
        }
      }
    });
  });

  //----button All battery---------
  batteryAll.addEventListener('click', function () {
    if (this.control.checked) {
      batteryLabel.forEach(item => {
        item.control.checked = false;
        item.classList.remove('filters__label_active');
        let valFilter = valueFilters.filter(val => val !== item.control.value);
        valueFilters = valFilter;
      });

      console.log(valueFilters);
    } else {
      batteryLabel.forEach(item => {
        item.control.checked = true;
        item.classList.add('filters__label_active');
        let valFilter = valueFilters.filter(val => val !== item.control.value);
        valueFilters = valFilter;
        valueFilters.push(item.control.value);
      });
      console.log(valueFilters);
    }
  });

  //----button All screen--------
  screenAll.addEventListener('click', function () {
    if (this.control.checked) {
      screenLabel.forEach(item => {
        item.control.checked = false;
        item.classList.remove('filters__label_active');
        let valFilter = valueFilters.filter(val => val !== item.control.value);
        valueFilters = valFilter;
      });

      console.log(valueFilters);
    } else {
      screenLabel.forEach(item => {
        item.control.checked = true;
        item.classList.add('filters__label_active');
        let valFilter = valueFilters.filter(val => val !== item.control.value);
        valueFilters = valFilter;
        valueFilters.push(item.control.value);
      });
      console.log(valueFilters);
    }
  });

  //------Filters Price-----------
  const priceMin = document.querySelector('#price-min');
  const priceMax = document.querySelector('#price-max');

  priceMin.addEventListener('input', handlePriceMin);
  priceMax.addEventListener('input', handlePriceMax);

  function handlePriceMin(event) {
    if (parseInt(event.target.value, 10) >= parseInt(priceMax.value, 10)) {
      event.target.value = priceMax.value;
    }
    console.log(event.target.value);
  }

  function handlePriceMax(event) {
    if (parseInt(event.target.value, 10) <= parseInt(priceMin.value, 10)) {
      event.target.value = priceMin.value;
    }
    console.log('PRICEMax ' + event.target.value);
  }
}
