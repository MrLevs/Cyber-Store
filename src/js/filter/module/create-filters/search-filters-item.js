'use strict';

export function searchFiltersItem(input, btn, productBrand, productBrandSearch) {
  let valueSearch = input.value.toLowerCase().trim();
  productBrandSearch.length = 0;

  if (input.value !== '') {
    btn.style.display = 'block';

    if (valid(valueSearch)) {
      productBrand.forEach(item => {
        if (item.toLowerCase().includes(valueSearch)) {
          productBrandSearch.push(item);
          console.log(productBrandSearch);
        }
      });
    } else {
      console.log('stop');
    }
  } else {
    btn.style.display = 'none';
  }
  console.log(valueSearch);
}

//--------input Validation ------------------------
function valid(elem) {
  const pattern = /^[a-zа-я\s]+$/gi;
  return pattern.test(elem);
}
