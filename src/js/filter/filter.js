'use strict';

import { selectItemFilters } from './module/select-item-filters'; //Select Item Filters
import { selectPriceMin, selectPriceMax, handlePriceMin, handlePriceMax } from './module/filter-price'; //Filter Price
import { filterResult } from './module/filter-result/filter-result'; //Filter Result
import { createProductCard } from './module/create-product-card'; //Create Product Card
import { countSelectedProducts, createCountsFilters } from './module/create-counts-filters'; //Count Selected Products, Counts Filters

export function filter(data) {
  //----Open accordion-------
  const filtersDetails = document.querySelectorAll('.filters__details');
  //----Select element-------
  const filtersLabel = document.querySelectorAll('.filters__label');
  //----filters-btn Open || Close-------
  const filtersBtnOpen = document.querySelector('#filters-btn-open');
  const filtersBtnClose = document.querySelector('#filters-btn-close');
  const filtersMenu = document.querySelector('#filters-menu');
  //-------Filter Price------------
  const priceFrom = document.querySelector('#price-from');
  const priceTo = document.querySelector('#price-to');
  const range = document.querySelector('#price-range');
  const priceMin = document.querySelector('#price-min');
  const priceMax = document.querySelector('#price-max');
  //-------Create Product Card------------
  const contentBlock = document.querySelector('.content__inner');
  //-------Create Count Products------------
  const selectedProducts = document.querySelector('.content__number');
  //------Create Counts Filters----------------
  const countsFilters = document.querySelectorAll('.filters__count');

  let priceAll = [];
  let filtersValue = [];
  let itemsBatteryAll = [];
  let itemsDiagonalAll = [];

  //-------Create Product Card------------
  if (contentBlock) {
    createProductCard(contentBlock, filterResult(data, filtersValue));
  }
  //--------------------------
  //-------Create Count Products------------
  if (selectedProducts) {
    countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
  }
  //-------------------------------
  //------Create Counts Filters----------------
  if (countsFilters) {
    createCountsFilters(countsFilters, filterResult(data, filtersValue));
  }
  //------------------------------
  //----filters-btn Open || Close-------
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
  //-------Filter Price------------ Настроить Price так чтобы не опускаться нижнего предела(min) или выше(max)!!!!
  if (priceFrom || priceTo || range || priceMin || priceMax) {
    data.forEach(item => {
      if (item.price) {
        priceAll.push(parseInt(item.price));
      }
    });

    let min = Math.min(...priceAll);
    let max = Math.max(...priceAll);
    let step = (max - min) / (100 - 0); //Finding the slope

    priceFrom.min = min.toString();
    priceFrom.max = max.toString();
    priceFrom.placeholder = `From ${min}`;
    priceTo.min = (min - 1).toString();
    priceTo.max = max.toString();
    priceTo.placeholder = `To ${max}`;

    priceMin.min = min.toString();
    priceMin.max = max.toString();
    priceMin.value = min.toString();
    priceMin.step = step.toString();

    priceMax.min = min.toString();
    priceMax.max = max.toString();
    priceMax.value = max.toString();
    priceMax.step = step.toString();

    priceMin.parentNode.parentNode.style.setProperty('--priceMin', '0');
    priceMax.parentNode.parentNode.style.setProperty('--priceMax', '100');

    priceFrom.addEventListener('input', selectPriceMinAndCreate);
    priceTo.addEventListener('input', selectPriceMaxAndCreate);

    priceMin.addEventListener('input', handlePriceMinAndCreate);
    priceMax.addEventListener('input', handlePriceMaxAndCreate);

    function selectPriceMinAndCreate(event) {
      selectPriceMin(event, filtersValue, priceMin, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }

    function selectPriceMaxAndCreate(event) {
      selectPriceMax(event, filtersValue, priceTo, priceMax, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }

    function handlePriceMinAndCreate(event) {
      handlePriceMin(event, filtersValue, priceFrom, priceMax, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }

    function handlePriceMaxAndCreate(event) {
      handlePriceMax(event, filtersValue, priceTo, priceMin, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }
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
    item.addEventListener('click', selectAndCreate);
    item.addEventListener('keydown', pressEnter);
  });

  function selectAndCreate(event) {
    selectItemFilters(event, filtersValue, itemsBatteryAll, itemsDiagonalAll);
    createProductCard(contentBlock, filterResult(data, filtersValue));
    countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
    createCountsFilters(countsFilters, filterResult(data, filtersValue));
  }

  function pressEnter(event) {
    if (event.code === 'Enter') {
      selectItemFilters(event, filtersValue, itemsBatteryAll, itemsDiagonalAll);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
      if (event.currentTarget.control.checked) {
        event.currentTarget.control.checked = false;
      } else {
        event.currentTarget.control.checked = true;
      }
    }
  }
  //---------------------------
}
