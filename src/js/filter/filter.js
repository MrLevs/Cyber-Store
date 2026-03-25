'use strict';

import { createFilterBrand } from './module/create-filters/create-filter-brand'; //Create Filter Brand
import { createFilterScreenType } from './module/create-filters/create-filter-screen-type'; //Create Filter Screen Type
import { searchFiltersItem } from './module/create-filters/search-filters-item'; // Search Filters Item
import { selectItemFilters } from './module/select-item-filters'; //Select Item Filters
import { selectPriceMin, selectPriceMax, handlePriceMin, handlePriceMax } from './module/filter-price'; //Filter Price
import { filterResult } from './module/filter-result/filter-result'; //Filter Result
import { createProductCard } from './module/create-product-card'; //Create Product Card
import { countSelectedProducts, createCountsFilters } from './module/create-counts-filters'; //Count Selected Products, Counts Filters

export function filter(data) {
  //----Filter Brand------------
  const formSearchBrand = document.querySelector('#form-search-brand');
  const formBrand = document.querySelector('#form-brand');

  let categoryProduct = 'smartphones';
  let productBrand = [];
  let productBrandSearch = [];

  data.forEach(item => {
    if (item.title === categoryProduct && item.brand && !productBrand.includes(item.brand)) {
      productBrand.push(item.brand);
    }
  });

  if (formBrand) {
    createFilterBrand(formBrand, productBrand);
  }

  if (formSearchBrand) {
    const inputFSBrand = formSearchBrand.querySelector('#input-search-brand');
    const btnResetBrand = formSearchBrand.querySelector('#button-reset-brand');

    btnResetBrand.style.display = 'none';

    inputFSBrand.addEventListener('input', searchBrand);
    inputFSBrand.addEventListener('keydown', cancel);
    btnResetBrand.addEventListener('click', btnResetBrandStyle);

    function searchBrand() {
      searchFiltersItem(inputFSBrand, btnResetBrand, productBrand, productBrandSearch);
      if (productBrandSearch.length === 0) {
        createFilterBrand(formBrand, productBrand);
      } else {
        createFilterBrand(formBrand, productBrandSearch);
      }

      countsFilters = document.querySelectorAll('.filters__count');
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);

      filtersLabel = document.querySelectorAll('.filters__label');
      filtersLabel.forEach(item => {
        item.removeEventListener('click', selectAndCreate);
        item.removeEventListener('keydown', pressEnter);
      });

      filtersLabel.forEach(item => {
        item.addEventListener('click', selectAndCreate);
        item.addEventListener('keydown', pressEnter);
      });
    }

    function btnResetBrandStyle() {
      btnResetBrand.style.display = 'none';
      productBrandSearch.length = 0;
      createFilterBrand(formBrand, productBrand);

      countsFilters = document.querySelectorAll('.filters__count');
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);

      filtersLabel = document.querySelectorAll('.filters__label');
      filtersLabel.forEach(item => {
        item.removeEventListener('click', selectAndCreate);
        item.removeEventListener('keydown', pressEnter);
      });

      filtersLabel.forEach(item => {
        item.addEventListener('click', selectAndCreate);
        item.addEventListener('keydown', pressEnter);
      });
    }

    //--------Cancel---------------
    function cancel(e) {
      if (e.code === 'Enter') {
        e.preventDefault();
        // displayWarning();
      }
    }
  }
  //--------------------------------
  //----Filter Screen Type-------
  const formScreenType = document.querySelector('#form-screen-type');
  if (formScreenType) {
    createFilterScreenType(formScreenType, data);
  }
  //-------------------------------
  //----Open accordion--------
  const filtersDetails = document.querySelectorAll('.filters__details');
  //----Select element-------
  let filtersLabel = document.querySelectorAll('.filters__label');
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
  let countsFilters = document.querySelectorAll('.filters__count');

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
    createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
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
    createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
  }

  function pressEnter(event) {
    if (event.code === 'Enter') {
      selectItemFilters(event, filtersValue, itemsBatteryAll, itemsDiagonalAll);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
      if (event.currentTarget.control.checked) {
        event.currentTarget.control.checked = false;
      } else {
        event.currentTarget.control.checked = true;
      }
    }
  }
  //---------------------------
  //-------Filter Price------------
  if (priceFrom || priceTo || range || priceMin || priceMax) {
    filterResult(data, filtersValue).forEach(item => {
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

    priceFrom.addEventListener('change', selectPriceMinAndCreate);
    priceTo.addEventListener('change', selectPriceMaxAndCreate);

    priceMin.addEventListener('input', handlePriceMinAndCreate);
    priceMax.addEventListener('input', handlePriceMaxAndCreate);

    function selectPriceMinAndCreate(event) {
      selectPriceMin(event, filtersValue, priceFrom, priceMin, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
    }

    function selectPriceMaxAndCreate(event) {
      selectPriceMax(event, filtersValue, priceTo, priceMax, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
    }

    function handlePriceMinAndCreate(event) {
      handlePriceMin(event, filtersValue, priceFrom, priceMax, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
    }

    function handlePriceMaxAndCreate(event) {
      handlePriceMax(event, filtersValue, priceTo, priceMin, range, min, max);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue), filtersValue, data);
    }
  }
  //------------------------------
}
