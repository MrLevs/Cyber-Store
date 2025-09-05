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

  let valueM = [];

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
        let valFilter = valueM.filter(val => val !== this.control.value);
        valueM = valFilter;
        console.log(valueM);
      } else {
        item.classList.add('filters__label_active');
        if (this.control.value !== 'all') {
          valueM.push(this.control.value);
          console.log(valueM);
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
          let valFilter = valueM.filter(val => val !== this.control.value);
          valueM = valFilter;
          this.control.checked = false;
          console.log(valueM);
        } else {
          item.classList.add('filters__label_active');
          valueM.push(this.control.value);
          console.log(valueM);
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
        let valFilter = valueM.filter(val => val !== item.control.value);
        valueM = valFilter;
      });

      console.log(valueM);
    } else {
      batteryLabel.forEach(item => {
        item.control.checked = true;
        item.classList.add('filters__label_active');
        let valFilter = valueM.filter(val => val !== item.control.value);
        valueM = valFilter;
        valueM.push(item.control.value);
      });
      console.log(valueM);
    }
  });

  //----button All screen--------
  screenAll.addEventListener('click', function () {
    if (this.control.checked) {
      screenLabel.forEach(item => {
        item.control.checked = false;
        item.classList.remove('filters__label_active');
        let valFilter = valueM.filter(val => val !== item.control.value);
        valueM = valFilter;
      });

      console.log(valueM);
    } else {
      screenLabel.forEach(item => {
        item.control.checked = true;
        item.classList.add('filters__label_active');
        let valFilter = valueM.filter(val => val !== item.control.value);
        valueM = valFilter;
        valueM.push(item.control.value);
      });
      console.log(valueM);
    }
  });
}
