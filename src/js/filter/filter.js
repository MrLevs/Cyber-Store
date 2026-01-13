'use strict';

import { filterResult } from './module/filter-result/filter-result'; //Filter Result
import { createProductCard } from './module/create-product-card'; //Create Product Card
import { countSelectedProducts, createCountsFilters } from './module/create-counts-filters'; //Count Selected Products, Counts Filters

export function filter(data) {
  const filtersDetails = document.querySelectorAll('.filters__details');
  const filtersLabel = document.querySelectorAll('.filters__label');

  let filtersValue = [];

  //-------Create Product Card------------
  let contentBlock = document.querySelector('.content__inner');
  if (contentBlock) {
    createProductCard(contentBlock, filterResult(data, filtersValue));
  }
  //--------------------------

  //-------Create Count Products------------
  const selectedProducts = document.querySelector('.content__number');
  if (selectedProducts) {
    countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
  }
  //-------------------------------

  //------Create Counts Filters----------------
  const countsFilters = document.querySelectorAll('.filters__count');
  if (countsFilters) {
    createCountsFilters(countsFilters, filterResult(data, filtersValue));
  }
  //------------------------------

  //----Open accordion---------
  filtersDetails.forEach(item => {
    let summary = item.querySelector('.filters__summary');
    summary.addEventListener('click', function () {
      if (item.hasAttribute('open')) {
        item.classList.remove('filters__details_active');
      } else {
        item.classList.add('filters__details_active');
      }
    });
  });
  //------------------------

  //----Select element-------
  filtersLabel.forEach(item => {
    item.addEventListener('click', function () {
      if (this.control.checked) {
        item.classList.remove('filters__label_active');
        let filter = filtersValue.filter(elem => elem !== this.control.value);
        filtersValue = filter;
        createProductCard(contentBlock, filterResult(data, filtersValue));
        countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
        createCountsFilters(countsFilters, filterResult(data, filtersValue));
      } else {
        item.classList.add('filters__label_active');
        if (this.control.value !== 'all') {
          filtersValue.push(this.control.value);
          createProductCard(contentBlock, filterResult(data, filtersValue));
          countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
          createCountsFilters(countsFilters, filterResult(data, filtersValue));
        }
      }
    });

    item.addEventListener('keydown', function (e) {
      if (e.code === 'Enter') {
        if (this.control.checked) {
          item.classList.remove('filters__label_active');
          let filter = filtersValue.filter(elem => elem !== this.control.value);
          filtersValue = filter;
          this.control.checked = false;
        } else {
          item.classList.add('filters__label_active');
          filtersValue.push(this.control.value);
          this.control.checked = true;
        }
      }
    });
  });
  //---------------------------

  //-----ButtonAll (filter ALL battery and screen)------
  const buttonAll = document.querySelectorAll('.button_all');

  if (buttonAll) {
    buttonAll.forEach(item => {
      item.addEventListener('click', selectAll);
    });
  }

  function selectAll() {
    let elemAll = this.control.parentNode.parentNode.querySelectorAll('.filters__label');
    let buttonAll = this.control.parentNode.parentNode.querySelector('.button_all');
    if (this.control.checked) {
      elemAll.forEach(item => {
        if (item !== buttonAll) {
          item.control.checked = false;
          item.classList.remove('filters__label_active');
          let filter = filtersValue.filter(val => val !== item.control.value);
          filtersValue = filter;
        }
      });
    } else {
      elemAll.forEach(item => {
        if (item !== buttonAll) {
          item.control.checked = true;
          item.classList.add('filters__label_active');
          let filter = filtersValue.filter(val => val !== item.control.value);
          filtersValue = filter;
          filtersValue.push(item.control.value);
        }
      });
    }
  }
  //---------------------------

  //----filters-btn Open || Close-------
  const filtersBtnOpen = document.querySelector('#filters-btn-open');
  const filtersBtnClose = document.querySelector('#filters-btn-close');
  const filtersMenu = document.querySelector('#filters-menu');

  if (filtersBtnOpen || filtersBtnClose) {
    filtersBtnOpen.addEventListener('click', menuFiltersOpen);
    filtersBtnClose.addEventListener('click', menuFiltersClose);
  }

  function menuFiltersOpen() {
    document.body.classList.add('_lock');
    filtersMenu.classList.add('filters_active');
  }

  function menuFiltersClose() {
    document.body.classList.remove('_lock');
    filtersMenu.classList.remove('filters_active');
  }
  //-----------------------------

  //------Filters Price-----------
  const priceMin = document.querySelector('#price-min');
  const priceMax = document.querySelector('#price-max');

  if (priceMin || priceMax) {
    priceMin.parentNode.parentNode.style.setProperty('--priceMin', '10');
    priceMax.parentNode.parentNode.style.setProperty('--priceMax', '40');

    priceMin.addEventListener('input', handlePriceMin);
    priceMax.addEventListener('input', handlePriceMax);
  }

  function handlePriceMin(event) {
    if (parseInt(event.target.value, 10) >= parseInt(priceMax.value, 10)) {
      event.target.value = priceMax.value;
    }

    if (event.target.value === '100') {
      event.target.style.zIndex = '50';
    } else {
      event.target.style.zIndex = '0';
    }

    event.target.parentNode.parentNode.style.setProperty('--priceMin', event.target.value);
  }

  function handlePriceMax(event) {
    if (parseInt(event.target.value, 10) <= parseInt(priceMin.value, 10)) {
      event.target.value = priceMin.value;
    }

    if (event.target.value === '0') {
      event.target.style.zIndex = '50';
    } else {
      event.target.style.zIndex = '0';
    }

    event.target.parentNode.parentNode.style.setProperty('--priceMax', event.target.value);
  }
  //-----------------------------------------------
}
