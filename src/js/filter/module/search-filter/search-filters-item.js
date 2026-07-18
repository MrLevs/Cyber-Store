'use strict';
import { validationWS } from '../../../validation-value'; // validation Input Search
import { displayWarningInputSearch } from '../../../warning'; // Display Warning Input Search

export function searchFiltersItem(input, btn, arrayProduct, arrayProductSearch, suggests) {
  const message = 'Warning!!! The input field must contain only letters!';
  let valueSearch = input.value.toLowerCase().trim();
  arrayProductSearch.length = 0;

  input.classList.remove('form-search__input_warning');
  suggests.classList.remove('form-search__suggests_warning');
  suggests.innerHTML = '';

  if (input.value !== '') {
    btn.style.display = 'block';

    if (validationWS(valueSearch)) {
      arrayProduct.forEach(item => {
        if (item.toLowerCase().includes(valueSearch)) {
          arrayProductSearch.push(item);
        }
      });
    } else {
      displayWarningInputSearch(message, suggests, input);
    }
  } else {
    btn.style.display = 'none';
    suggests.style.display = 'none';
  }
}
