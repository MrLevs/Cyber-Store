'use strict';

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
  //-------Filter Price------------
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

    priceFrom.addEventListener('input', selectPriceMin);
    priceTo.addEventListener('input', selectPriceMax);

    priceMin.addEventListener('input', handlePriceMin);
    priceMax.addEventListener('input', handlePriceMax);

    function selectPriceMin(event) {
      priceMin.value = event.target.value;
      let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
      range.style.setProperty('--priceMin', percent);
      let filter = filtersValue.filter(val => !val.includes('min'));
      filtersValue = filter;
      filtersValue.push(`min${event.target.value}`);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }

    function selectPriceMax(event) {
      if (priceTo.value === (min - 1).toString()) {
        priceTo.value = max.toString();
      }
      priceMax.value = event.target.value;
      let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
      range.style.setProperty('--priceMax', percent);
      let filter = filtersValue.filter(val => !val.includes('max'));
      filtersValue = filter;
      filtersValue.push(`max${event.target.value}`);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }

    function handlePriceMin(event) {
      if (parseInt(event.target.value, 10) >= parseInt(priceMax.value, 10)) {
        event.target.value = priceMax.value;
      }

      if (event.target.value === max.toString()) {
        event.target.style.zIndex = '50';
      } else {
        event.target.style.zIndex = '0';
      }

      let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
      range.style.setProperty('--priceMin', percent);
      priceFrom.value = event.target.value;
      let filter = filtersValue.filter(val => !val.includes('min'));
      filtersValue = filter;
      filtersValue.push(`min${event.target.value}`);
      createProductCard(contentBlock, filterResult(data, filtersValue));
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(countsFilters, filterResult(data, filtersValue));
    }

    function handlePriceMax(event) {
      if (parseInt(event.target.value, 10) <= parseInt(priceMin.value, 10)) {
        event.target.value = priceMin.value;
      }

      if (event.target.value === min.toString()) {
        event.target.style.zIndex = '50';
      } else {
        event.target.style.zIndex = '0';
      }

      let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
      range.style.setProperty('--priceMax', percent);
      priceTo.value = event.target.value;
      let filter = filtersValue.filter(val => !val.includes('max'));
      filtersValue = filter;
      filtersValue.push(`max${event.target.value}`);
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
    item.addEventListener('click', selectItemFilters);
    item.addEventListener('keydown', pressEnter);
  });

  function selectItemFilters(event) {
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
}
