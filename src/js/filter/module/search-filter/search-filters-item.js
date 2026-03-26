'use strict';

export function searchFiltersItem(input, btn, arrayProduct, arrayProductSearch, suggests) {
  let valueSearch = input.value.toLowerCase().trim();
  arrayProductSearch.length = 0;

  input.classList.remove('form-search__input_warning');
  suggests.classList.remove('form-search__suggests_warning');
  suggests.innerHTML = '';

  if (input.value !== '') {
    btn.style.display = 'block';

    if (valid(valueSearch)) {
      arrayProduct.forEach(item => {
        if (item.toLowerCase().includes(valueSearch)) {
          arrayProductSearch.push(item);
        }
      });
    } else {
      displayWarning(input, suggests);
    }
  } else {
    btn.style.display = 'none';
    suggests.style.display = 'none';
  }
}

//--------input Validation ------------------------
function valid(elem) {
  const pattern = /^[a-zа-я\s]+$/gi;
  return pattern.test(elem);
}

//--------------Show Warning--------------------
function displayWarning(input, suggests) {
  const p = document.createElement('p');
  p.className = 'form-search__warning';
  p.textContent = 'Warning!!! The input field must contain only letters!';

  suggests.innerHTML = '';
  input.classList.add('form-search__input_warning');
  suggests.append(p);
  suggests.classList.add('form-search__suggests_warning');
  suggests.style.display = 'block';
}
