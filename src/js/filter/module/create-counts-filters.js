'use strict';

export function countSelectedProducts(elem, array) {
  elem.innerHTML = '';
  elem.append(array.length);
}

export function createCountsFilters(elem, arrayFilterResult, arrayFiltersValue, arrayData) {
  let categoryProduct = 'smartphones';
  let productFilter = [];

  let divAll = document.querySelectorAll('.filters__disabled');
  divAll.forEach(elem => elem.remove());

  arrayData.forEach(item => {
    if (item.title === categoryProduct && item.brand) {
      productFilter.push(item);
    }
  });

  let arrayExceptBrand = arrayFiltersValue.filter(
    items =>
      items !== 'apple' &&
      items !== 'samsung' &&
      items !== 'xiaomi' &&
      items !== 'poco' &&
      items !== 'oppo' &&
      items !== 'honor' &&
      items !== 'motorola' &&
      items !== 'nokia' &&
      items !== 'realme',
  );

  let arrayExceptBattery = arrayFiltersValue.filter(
    items =>
      items !== '2499' &&
      items !== '2500-3999' &&
      items !== '4000-4499' &&
      items !== '4500-4999' &&
      items !== '5000-5999' &&
      items !== '6000',
  );

  let arrayExceptScreen = arrayFiltersValue.filter(
    items => items !== 'ips' && items !== 'retina' && items !== 'oled' && items !== 'amoled' && items !== 'poled',
  );

  let arrayExceptDiagonal = arrayFiltersValue.filter(
    items =>
      items !== '6.09' &&
      items !== '6.1-6.29' &&
      items !== '6.3-6.49' &&
      items !== '6.5-6.59' &&
      items !== '6.6-6.79' &&
      items !== '6.8',
  );

  let arrayExceptProtection = arrayFiltersValue.filter(
    items => items !== 'ipx4' && items !== 'ipx5' && items !== 'ipx6' && items !== 'ipx7',
  );

  let arrayExceptMemory = arrayFiltersValue.filter(
    items =>
      items !== '32' && items !== '64' && items !== '128' && items !== '256' && items !== '512' && items !== '1024',
  );

  elem.forEach(item => {
    item.innerHTML = '';
    //---Filters Brand
    switch (item.dataset.brand) {
      case 'apple':
        countBrandFilters(item);
        break;
      case 'samsung':
        countBrandFilters(item);
        break;
      case 'xiaomi':
        countBrandFilters(item);
        break;
      case 'poco':
        countBrandFilters(item);
        break;
      case 'oppo':
        countBrandFilters(item);
        break;
      case 'honor':
        countBrandFilters(item);
        break;
      case 'motorola':
        countBrandFilters(item);
        break;
      case 'nokia':
        countBrandFilters(item);
        break;
      case 'realme':
        countBrandFilters(item);
        break;
    }

    //---Filters Battery
    switch (item.dataset.battery) {
      case '2499':
        countFilters(item);
        break;
      case '2500-3999':
        countFilters(item);
        break;
      case '4000-4499':
        countFilters(item);
        break;
      case '4500-4999':
        countFilters(item);
        break;
      case '5000-5999':
        countFilters(item);
        break;
      case '6000':
        countFilters(item);
        break;
    }

    //---Filters Screen
    switch (item.dataset.screen) {
      case 'ips':
        countScreenFilters(item);
        break;

      case 'retina':
        countScreenFilters(item);
        break;

      case 'oled':
        countScreenFilters(item);
        break;

      case 'amoled':
        countScreenFilters(item);
        break;

      case 'poled':
        countScreenFilters(item);
        break;
    }

    //---Filters Diagonal
    switch (item.dataset.diagonal) {
      case '6.09':
        countFilters(item);
        break;
      case '6.1-6.29':
        countFilters(item);
        break;
      case '6.3-6.49':
        countFilters(item);
        break;
      case '6.5-6.59':
        countFilters(item);
        break;
      case '6.6-6.79':
        countFilters(item);
        break;
      case '6.8':
        countFilters(item);
        break;
    }

    //---Filters Protection
    switch (item.dataset.protection) {
      case 'ipx4':
        countProtectionFilters(item);
        break;

      case 'ipx5':
        countProtectionFilters(item);
        break;

      case 'ipx6':
        countProtectionFilters(item);
        break;

      case 'ipx7':
        countProtectionFilters(item);
        break;
    }

    //---Filters Memory
    switch (item.dataset.memory) {
      case '32':
        countMemoryFilters(item);
        break;

      case '64':
        countMemoryFilters(item);
        break;

      case '128':
        countMemoryFilters(item);
        break;

      case '256':
        countMemoryFilters(item);
        break;

      case '512':
        countMemoryFilters(item);
        break;

      case '1024':
        countMemoryFilters(item);
        break;
    }
  });

  function countBrandFilters(item) {
    if (arrayExceptBrand.length === 0) {
      let arrayCount = productFilter.filter(items => items.brand === item.dataset.brand);
      filterCountInnerHtml(item, arrayCount);
    } else {
      let arrayCount = arrayFilterResult.filter(
        items =>
          items.brand ===
          item.dataset.brand
            .split(' ')
            .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
            .join(' '),
      );
      filterCountInnerHtml(item, arrayCount);
    }
  }

  function countFilters(item) {
    let datasetKey = item.dataset;
    for (let key in datasetKey) {
      let datasetValue = datasetKey[key].split('-');
      if (key === 'battery') {
        if (arrayExceptBattery.length === 0) {
          if (datasetValue.length === 1) {
            if (datasetValue[0] === '6000') {
              let arrayCount = productFilter.filter(items => items.battery >= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            } else {
              let arrayCount = productFilter.filter(items => items.battery <= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            }
          } else {
            let arrayCount = productFilter.filter(
              items => datasetValue[0] <= items.battery && items.battery <= datasetValue[1],
            );
            filterCountInnerHtml(item, arrayCount);
          }
        } else {
          if (datasetValue.length === 1) {
            if (datasetValue[0] === '6000') {
              let arrayCount = arrayFilterResult.filter(items => items.battery >= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            } else {
              let arrayCount = arrayFilterResult.filter(items => items.battery <= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            }
          } else {
            let arrayCount = arrayFilterResult.filter(
              items => datasetValue[0] <= items.battery && items.battery <= datasetValue[1],
            );
            filterCountInnerHtml(item, arrayCount);
          }
        }
      } else {
        if (arrayExceptDiagonal.length === 0) {
          if (datasetValue.length === 1) {
            if (datasetValue[0] === '6.8') {
              let arrayCount = productFilter.filter(items => items.diagonal >= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            } else {
              let arrayCount = productFilter.filter(items => items.diagonal <= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            }
          } else {
            let arrayCount = productFilter.filter(
              items => datasetValue[0] <= items.diagonal && items.diagonal <= datasetValue[1],
            );
            filterCountInnerHtml(item, arrayCount);
          }
        } else {
          if (datasetValue.length === 1) {
            if (datasetValue[0] === '6.8') {
              let arrayCount = arrayFilterResult.filter(items => items.diagonal >= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            } else {
              let arrayCount = arrayFilterResult.filter(items => items.diagonal <= datasetValue[0]);
              filterCountInnerHtml(item, arrayCount);
            }
          } else {
            let arrayCount = arrayFilterResult.filter(
              items => datasetValue[0] <= items.diagonal && items.diagonal <= datasetValue[1],
            );
            filterCountInnerHtml(item, arrayCount);
          }
        }
      }
    }
  }

  function countScreenFilters(item) {
    if (arrayExceptScreen.length === 0) {
      let arrayCount = productFilter.filter(items => items.screen === item.dataset.screen);
      filterCountInnerHtml(item, arrayCount);
    } else {
      let arrayCount = arrayFilterResult.filter(items => items.screen === item.dataset.screen);
      filterCountInnerHtml(item, arrayCount);
    }
  }

  function countProtectionFilters(item) {
    if (arrayExceptProtection.length === 0) {
      let arrayCount = productFilter.filter(items => items.protection === item.dataset.protection);
      filterCountInnerHtml(item, arrayCount);
    } else {
      let arrayCount = arrayFilterResult.filter(items => items.protection === item.dataset.protection);
      filterCountInnerHtml(item, arrayCount);
    }
  }

  function countMemoryFilters(item) {
    if (arrayExceptMemory.length === 0) {
      let arrayCount = productFilter.filter(items => items.memory === item.dataset.memory);
      filterCountInnerHtml(item, arrayCount);
    } else {
      let arrayCount = arrayFilterResult.filter(items => items.memory === item.dataset.memory);
      filterCountInnerHtml(item, arrayCount);
    }
  }
}

function filterCountInnerHtml(item, arrayCount) {
  let parentItem = item.parentNode.parentNode;
  let filtersItem = item.parentNode.parentNode.parentNode;

  let div = document.createElement('div');
  div.className = 'filters__disabled';
  div.style.width = `${filtersItem.offsetWidth}px`;
  div.style.height = `${filtersItem.offsetHeight}px`;
  div.style.position = 'absolute';
  div.style.top = '0';
  div.style.left = '0';
  div.style.zIndex = '30';

  parentItem.classList.remove('filters__label_disabled');
  if (arrayCount.length === 0) {
    parentItem.classList.add('filters__label_disabled');
    filtersItem.append(div);
  } else {
    item.innerHTML = arrayCount.length;
  }
}
