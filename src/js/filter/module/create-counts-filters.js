'use strict';

export function countSelectedProducts(elem, array) {
  elem.innerHTML = '';
  elem.append(array.length);
}

export function createCountsFilters(elem, array) {
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
    let arrayFiltersProducts = array.filter(
      items =>
        items.brand ===
        item.dataset.brand
          .split(' ')
          .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
          .join(' '),
    );
    item.innerHTML = arrayFiltersProducts.length;
  }

  function countFilters(item) {
    let datasetKey = item.dataset;
    for (let key in datasetKey) {
      let datasetValue = datasetKey[key].split('-');
      if (key === 'battery') {
        if (datasetValue.length == 1) {
          if (datasetValue[0] === '6000') {
            let arrayFiltersProducts = array.filter(items => items.battery >= datasetValue[0]);
            item.innerHTML = arrayFiltersProducts.length;
          } else {
            let arrayFiltersProducts = array.filter(items => items.battery <= datasetValue[0]);
            item.innerHTML = arrayFiltersProducts.length;
          }
        } else {
          let arrayFiltersProducts = array.filter(
            items => datasetValue[0] <= items.battery && items.battery <= datasetValue[1],
          );
          item.innerHTML = arrayFiltersProducts.length;
        }
      } else {
        if (datasetValue.length == 1) {
          if (datasetValue[0] === '6.8') {
            let arrayFiltersProducts = array.filter(items => items.diagonal >= datasetValue[0]);
            item.innerHTML = arrayFiltersProducts.length;
          } else {
            let arrayFiltersProducts = array.filter(items => items.diagonal <= datasetValue[0]);
            item.innerHTML = arrayFiltersProducts.length;
          }
        } else {
          let arrayFiltersProducts = array.filter(
            items => datasetValue[0] <= items.diagonal && items.diagonal <= datasetValue[1],
          );
          item.innerHTML = arrayFiltersProducts.length;
        }
      }
    }
  }

  function countScreenFilters(item) {
    let arrayFiltersProducts = array.filter(items => items.screen === item.dataset.screen);
    item.innerHTML = arrayFiltersProducts.length;
  }

  function countProtectionFilters(item) {
    let arrayFiltersProducts = array.filter(items => items.protection === item.dataset.protection);
    item.innerHTML = arrayFiltersProducts.length;
  }

  function countMemoryFilters(item) {
    let arrayFiltersProducts = array.filter(items => items.memory === item.dataset.memory);
    item.innerHTML = arrayFiltersProducts.length;
  }
}
