'use strict';

export function filterPrice(data) {
  const priceFrom = document.querySelector('#price-from');
  const priceTo = document.querySelector('#price-to');
  const range = document.querySelector('#price-range');
  const priceMin = document.querySelector('#price-min');
  const priceMax = document.querySelector('#price-max');

  let priceAll = [];

  data.forEach(item => {
    if (item.price) {
      priceAll.push(parseInt(item.price));
    }
  });

  let min = Math.min(...priceAll);
  let max = Math.max(...priceAll);
  let step = (max - min) / (100 - 0); //Finding the slope

  min = Math.min(...priceAll);
  max = Math.max(...priceAll);

  priceFrom.min = min.toString();
  priceFrom.max = max.toString();
  priceFrom.placeholder = `From ${min}`;
  priceTo.min = min.toString();
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
    let percent = ((parseInt(event.target.value) - min) / ((max - min) / (100 - 0))).toString();
    range.style.setProperty('--priceMin', percent);
  }

  function selectPriceMax(event) {
    if (priceTo.value === min.toString()) {
      // Решить вопрос с макс стоимостью!!!!
      priceTo.value = max.toString();
    }
    priceMax.value = event.target.value;
    let percent = ((parseInt(event.target.value) - min) / ((max - min) / (100 - 0))).toString();
    range.style.setProperty('--priceMax', percent);
  }

  function handlePriceMin(event) {
    if (parseInt(event.target.value, 10) >= parseInt(priceMax.value, 10)) {
      event.target.value = priceMax.value;
    }

    if (event.target.value === max) {
      event.target.style.zIndex = '50';
    } else {
      event.target.style.zIndex = '0';
    }

    let percent = ((parseInt(event.target.value) - min) / ((max - min) / (100 - 0))).toString();
    range.style.setProperty('--priceMin', percent);
    priceFrom.value = event.target.value;
  }

  function handlePriceMax(event) {
    if (parseInt(event.target.value, 10) <= parseInt(priceMin.value, 10)) {
      event.target.value = priceMin.value;
    }

    if (event.target.value === min) {
      event.target.style.zIndex = '50';
    } else {
      event.target.style.zIndex = '0';
    }

    let percent = ((parseInt(event.target.value) - min) / ((max - min) / (100 - 0))).toString();
    range.style.setProperty('--priceMax', percent);
    priceTo.value = event.target.value;
  }
}
