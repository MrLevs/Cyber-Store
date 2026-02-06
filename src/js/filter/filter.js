'use strict';

import { filterResult } from './module/filter-result/filter-result'; //Filter Result
import { createProductCard } from './module/create-product-card'; //Create Product Card
import { countSelectedProducts, createCountsFilters } from './module/create-counts-filters'; //Count Selected Products, Counts Filters

export function filter(data) {
  const filtersDetails = document.querySelectorAll('.filters__details');
  const filtersLabel = document.querySelectorAll('.filters__label');

  let filtersValue = [];
  let itemsBatteryAll = [];
  let itemsDiagonalAll = [];

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
    item.addEventListener('click', selectItemFilters);
    item.addEventListener('keydown', pressEnter);
  });

  function selectItemFilters(event) {
    console.log(itemsBatteryAll);
    if (event.currentTarget.control.checked) {
      event.currentTarget.classList.remove('filters__label_active');
      if (event.currentTarget.control.value == 'battery-all') {
        selectAll(event.currentTarget, itemsBatteryAll);
      } else if (event.currentTarget.control.value == 'diagonal-all') {
        selectAll(event.currentTarget, itemsDiagonalAll);
      } else {
        if (itemsBatteryAll.includes(event.currentTarget)) {
          let buttonAll = event.currentTarget.parentNode.parentNode.querySelector('.button_all');
          buttonAll.classList.remove('filters__label_active');
          buttonAll.control.checked = false;
          itemsBatteryAll = [];
        }
        if (itemsDiagonalAll.includes(event.currentTarget)) {
          let buttonAll = event.currentTarget.parentNode.parentNode.querySelector('.button_all');
          buttonAll.classList.remove('filters__label_active');
          buttonAll.control.checked = false;
          itemsDiagonalAll = [];
        }
        let filter = filtersValue.filter(elem => elem !== event.currentTarget.control.value);
        filtersValue = filter;
        createProductCard(contentBlock, filterResult(data, filtersValue));
        countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
        createCountsFilters(countsFilters, filterResult(data, filtersValue));
      }
    } else {
      event.currentTarget.classList.add('filters__label_active');
      if (event.currentTarget.control.value == 'battery-all') {
        selectAll(event.currentTarget, itemsBatteryAll);
      } else if (event.currentTarget.control.value == 'diagonal-all') {
        selectAll(event.currentTarget, itemsDiagonalAll);
      } else {
        filtersValue.push(event.currentTarget.control.value);
        createProductCard(contentBlock, filterResult(data, filtersValue));
        countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
        createCountsFilters(countsFilters, filterResult(data, filtersValue));
      }
    }
  }

  function selectAll(item, array) {
    let elemAll = Array.from(item.parentNode.parentNode.querySelectorAll('.filters__label')).filter(
      item => !item.classList.contains('button_all'),
    );
    elemAll.forEach(item => array.push(item));

    if (item.control.checked) {
      elemAll.forEach(item => {
        item.control.checked = false;
        item.classList.remove('filters__label_active');
        let filter = filtersValue.filter(val => val !== item.control.value);
        filtersValue = filter;
      });
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    } else {
      elemAll.forEach(item => {
        item.control.checked = true;
        item.classList.add('filters__label_active');
        let filter = filtersValue.filter(val => val !== item.control.value);
        filtersValue = filter;
        filtersValue.push(item.control.value);
      });
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }
  }

  function pressEnter(event) {
    if (event.code === 'Enter') {
      selectItemFilters(event);
      if (event.currentTarget.control.checked) {
        event.currentTarget.control.checked = false;
      } else {
        event.currentTarget.control.checked = true;
      }
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
