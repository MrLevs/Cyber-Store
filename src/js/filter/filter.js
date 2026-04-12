'use strict';

import { createFilterBrand } from './module/search-filter/create-filter-brand'; //Create Filter Brand
import { createFilterScreenType } from './module/search-filter/create-filter-screen-type'; //Create Filter Screen Type
import { searchFiltersItem } from './module/search-filter/search-filters-item'; // Search Filters Item
import { selectItemFilters } from './module/select-item-filters'; //Select Item Filters
import { selectPriceMin, selectPriceMax, handlePriceMin, handlePriceMax } from './module/filter-price'; //Filter Price
import { filterResult } from './module/filter-result/filter-result'; //Filter Result
import { createProductCard } from './module/create-product-card'; //Create Product Card
import { countSelectedProducts, createCountsFilters } from './module/create-counts-filters'; //Count Selected Products, Counts Filters

export function filter(data) {
  const categoryProduct = 'smartphones';
  //----Filter Brand------------
  const filterBrand = document.querySelector('#filter-brand');

  if (filterBrand) {
    const formSearchBrand = filterBrand.querySelector('#form-search-brand');
    const inputFSBrand = formSearchBrand.querySelector('#input-search-brand');
    const btnResetBrand = formSearchBrand.querySelector('#button-reset-brand');
    const suggestsBrand = formSearchBrand.querySelector('.form-search__suggests');
    const formBrand = filterBrand.querySelector('#form-brand');

    let productBrand = [];
    let productBrandSearch = [];

    data.forEach(item => {
      if (item.title === categoryProduct && item.brand && !productBrand.includes(item.brand)) {
        productBrand.push(item.brand);
      }
    });

    createFilterBrand(formBrand, productBrand);
    searchFilters(
      formSearchBrand,
      formBrand,
      inputFSBrand,
      btnResetBrand,
      suggestsBrand,
      productBrand,
      productBrandSearch,
    );
  }
  //-----------------------------
  //----Filter Screen Type-------
  const filterScreenType = document.querySelector('#filter-screen-type');

  if (filterScreenType) {
    const formSearchScreenType = filterScreenType.querySelector('#form-search-screen-type');
    const inputFSScreenType = formSearchScreenType.querySelector('#input-search-screen-type');
    const btnResetScreenType = formSearchScreenType.querySelector('#button-reset-screen-type');
    const suggestsScreenType = formSearchScreenType.querySelector('.form-search__suggests');
    const formScreenType = filterScreenType.querySelector('#form-screen-type');

    let productScreenType = [];
    let productScreenTypeSearch = [];

    data.forEach(item => {
      if (item.title === categoryProduct && item.brand && !productScreenType.includes(item.screen)) {
        productScreenType.push(item.screen);
      }
    });

    createFilterScreenType(formScreenType, productScreenType);
    searchFilters(
      formSearchScreenType,
      formScreenType,
      inputFSScreenType,
      btnResetScreenType,
      suggestsScreenType,
      productScreenType,
      productScreenTypeSearch,
    );
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
  //------Select Filter Content-----------------
  const selectFilterContent = document.querySelector('#content-select');

  let priceAll = [];
  let filtersValue = [];
  let itemsBatteryAll = [];
  let itemsDiagonalAll = [];
  let like = JSON.parse(window.localStorage.getItem('like')); //Local Storage----Replacement DB
  if (like === null) {
    like = [];
  }

  //-------Create Product Card------------
  if (contentBlock) {
    createSortProductCard();
  }
  //--------------------------
  //----Product Card Button Like-------------
  let btnLike = document.querySelectorAll('.product-card__btn');
  if (btnLike.length > 0) {
    btnLike.forEach(item => {
      item.addEventListener('click', pressLike);
      item.addEventListener('keydown', pressLikeEnter);
    });
  }
  //------------------------------------------------------------
  //-------Create Count Products------------
  if (selectedProducts) {
    countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
  }
  //-------------------------------
  //------Create Counts Filters----------------
  if (countsFilters.length > 0) {
    createCountsFilters(
      countsFilters,
      filterResult(data, filtersValue),
      filtersValue,
      data,
      itemsBatteryAll,
      itemsDiagonalAll,
    );
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
  if (filtersDetails.length > 0) {
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
  }
  //------------------------
  //----Select element-------
  if (filtersLabel.length > 0) {
    filtersLabel.forEach(item => {
      item.addEventListener('click', selectAndCreate);
      item.addEventListener('keydown', pressEnter);
    });
  }

  function selectAndCreate(event) {
    selectItemFilters(event, filtersValue, itemsBatteryAll, itemsDiagonalAll);
    createSortProductCard();
    countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
    createCountsFilters(
      countsFilters,
      filterResult(data, filtersValue),
      filtersValue,
      data,
      itemsBatteryAll,
      itemsDiagonalAll,
    );

    btnLike = document.querySelectorAll('.product-card__btn');
    if (btnLike.length > 0) {
      btnLike.forEach(item => {
        item.addEventListener('click', pressLike);
        item.addEventListener('keydown', pressLikeEnter);
      });
    }
  }

  function pressEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      selectAndCreate(event);

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
      createSortProductCard();
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(
        countsFilters,
        filterResult(data, filtersValue),
        filtersValue,
        data,
        itemsBatteryAll,
        itemsDiagonalAll,
      );
    }

    function selectPriceMaxAndCreate(event) {
      selectPriceMax(event, filtersValue, priceTo, priceMax, range, min, max);
      createSortProductCard();
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(
        countsFilters,
        filterResult(data, filtersValue),
        filtersValue,
        data,
        itemsBatteryAll,
        itemsDiagonalAll,
      );
    }

    function handlePriceMinAndCreate(event) {
      handlePriceMin(event, filtersValue, priceFrom, priceMax, range, min, max);
      createSortProductCard();
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(
        countsFilters,
        filterResult(data, filtersValue),
        filtersValue,
        data,
        itemsBatteryAll,
        itemsDiagonalAll,
      );
    }

    function handlePriceMaxAndCreate(event) {
      handlePriceMax(event, filtersValue, priceTo, priceMin, range, min, max);
      createSortProductCard();
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
      createCountsFilters(
        countsFilters,
        filterResult(data, filtersValue),
        filtersValue,
        data,
        itemsBatteryAll,
        itemsDiagonalAll,
      );
    }
  }
  //-----------------------------------------
  //-----Search Filters---------------------
  function searchFilters(formSearch, form, input, btn, suggests, arrayProduct, arrayProductSearch) {
    const element = formSearch.querySelector('#input-search-brand');

    btn.style.display = 'none';
    suggests.style.display = 'none';

    input.addEventListener('input', searchFilterBrand);
    input.addEventListener('keydown', cancel);
    btn.addEventListener('click', btnResetSearchBrand);

    function searchFilterBrand() {
      let filter = filtersValue.filter(item => !arrayProduct.includes(item));
      filtersValue.length = 0;
      filtersValue.push(...filter);

      searchFiltersItem(input, btn, arrayProduct, arrayProductSearch, suggests);
      if (arrayProductSearch.length === 0) {
        if (element) {
          createFilterBrand(form, arrayProduct);
        } else {
          createFilterScreenType(form, arrayProduct);
        }
      } else {
        if (element) {
          createFilterBrand(form, arrayProductSearch);
        } else {
          createFilterScreenType(form, arrayProductSearch);
        }
      }

      countsFilters = document.querySelectorAll('.filters__count');
      createCountsFilters(
        countsFilters,
        filterResult(data, filtersValue),
        filtersValue,
        data,
        itemsBatteryAll,
        itemsDiagonalAll,
      );

      filtersLabel = document.querySelectorAll('.filters__label');
      if (filtersLabel.length > 0) {
        filtersLabel.forEach(item => {
          item.addEventListener('click', selectAndCreate);
          item.addEventListener('keydown', pressEnter);
        });
      }

      createSortProductCard();
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
    }

    function btnResetSearchBrand() {
      let filter = filtersValue.filter(item => !arrayProduct.includes(item));
      filtersValue.length = 0;
      filtersValue.push(...filter);

      btn.style.display = 'none';
      input.classList.remove('form-search__input_warning');
      suggests.classList.remove('form-search__suggests_warning');
      suggests.innerHTML = '';
      suggests.style.display = 'none';
      arrayProductSearch.length = 0;
      if (element) {
        createFilterBrand(form, arrayProduct);
      } else {
        createFilterScreenType(form, arrayProduct);
      }

      countsFilters = document.querySelectorAll('.filters__count');
      createCountsFilters(
        countsFilters,
        filterResult(data, filtersValue),
        filtersValue,
        data,
        itemsBatteryAll,
        itemsDiagonalAll,
      );

      filtersLabel = document.querySelectorAll('.filters__label');
      if (filtersLabel.length > 0) {
        filtersLabel.forEach(item => {
          item.addEventListener('click', selectAndCreate);
          item.addEventListener('keydown', pressEnter);
        });
      }

      createSortProductCard();
      countSelectedProducts(selectedProducts, filterResult(data, filtersValue));
    }
  }
  //----------------------------------------------------------------
  //--------Cancel---------------
  function cancel(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  }
  //-------------------------------
  //------Select Filter Content-----------------
  if (selectFilterContent) {
    selectFilterContent.addEventListener('change', createSortProductCard);
  }
  //-----------------------------------------------------------------------------
  //-------Create and Sort Product Card-----------------------
  function createSortProductCard() {
    if (selectFilterContent.value === 'rating') {
      createProductCard(
        contentBlock,
        filterResult(data, filtersValue).sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)),
        like,
      );
    } else if (selectFilterContent.value === 'ascending-price') {
      createProductCard(
        contentBlock,
        filterResult(data, filtersValue).sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10)),
        like,
      );
    } else if (selectFilterContent.value === 'descending-price') {
      createProductCard(
        contentBlock,
        filterResult(data, filtersValue).sort((a, b) => parseInt(b.price, 10) - parseInt(a.price, 10)),
        like,
      );
    } else if (selectFilterContent.value === 'new') {
      createProductCard(
        contentBlock,
        filterResult(data, filtersValue).sort((a, b) => new Date(b.date) - new Date(a.date)),
        like,
      );
    }
  }
  //---------------------------------------------------------------------
  //-----Like--Local Storage---Replacement DB--------------------------
  function pressLike(event) {
    let targetValue = event.currentTarget.value;
    let storage = window.localStorage;
    if (event.currentTarget.classList.contains('product-card__btn_active')) {
      event.currentTarget.classList.remove('product-card__btn_active');
      let filter = like.filter(item => item['serial-number'] !== targetValue);
      like.length = 0;
      like.push(...filter);
    } else {
      event.currentTarget.classList.add('product-card__btn_active');
      let filter = filterResult(data, filtersValue).filter(item => item['serial-number'] === targetValue);
      like.push(...filter);
    }
    storage.setItem('like', JSON.stringify(like));
    like = JSON.parse(storage.getItem('like'));
  }

  function pressLikeEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      pressLike(event);
    }
  }
}
