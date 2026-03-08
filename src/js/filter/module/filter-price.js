'use strict';

export function selectPriceMin(event, arrayFiltersValue, priceMin, range, min, max) {
  priceMin.value = event.target.value;

  let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
  range.style.setProperty('--priceMin', percent);

  let filter = arrayFiltersValue.filter(val => !val.includes('min'));
  arrayFiltersValue.length = 0;
  arrayFiltersValue.push(...filter);
  arrayFiltersValue.push(`min${event.target.value}`);
}

export function selectPriceMax(event, arrayFiltersValue, priceTo, priceMax, range, min, max) {
  if (priceTo.value === (min - 1).toString()) {
    priceTo.value = max.toString();
  }

  priceMax.value = event.target.value;

  let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
  range.style.setProperty('--priceMax', percent);

  let filter = arrayFiltersValue.filter(val => !val.includes('max'));
  arrayFiltersValue.length = 0;
  arrayFiltersValue.push(...filter);
  arrayFiltersValue.push(`max${event.target.value}`);
}

export function handlePriceMin(event, arrayFiltersValue, priceFrom, priceMax, range, min, max) {
  if (parseInt(event.target.value, 10) >= parseInt(priceMax.value, 10)) {
    event.target.value = priceMax.value;
  }

  if (event.target.value === max.toString()) {
    event.target.style.zIndex = '50';
  } else {
    event.target.style.zIndex = '0';
  }

  priceFrom.value = event.target.value;

  let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
  range.style.setProperty('--priceMin', percent);

  let filter = arrayFiltersValue.filter(val => !val.includes('min'));
  arrayFiltersValue.length = 0;
  arrayFiltersValue.push(...filter);
  arrayFiltersValue.push(`min${event.target.value}`);
}

export function handlePriceMax(event, arrayFiltersValue, priceTo, priceMin, range, min, max) {
  if (parseInt(event.target.value, 10) <= parseInt(priceMin.value, 10)) {
    event.target.value = priceMin.value;
  }

  if (event.target.value === min.toString()) {
    event.target.style.zIndex = '50';
  } else {
    event.target.style.zIndex = '0';
  }
  priceTo.value = event.target.value;

  let percent = ((parseInt(event.target.value, 10) - min) / ((max - min) / (100 - 0))).toString();
  range.style.setProperty('--priceMax', percent);

  let filter = arrayFiltersValue.filter(val => !val.includes('max'));
  arrayFiltersValue.length = 0;
  arrayFiltersValue.push(...filter);
  arrayFiltersValue.push(`max${event.target.value}`);
}
