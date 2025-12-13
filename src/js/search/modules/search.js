'use strict';

import { createResults } from './create-results'; //Create Results

export function search(input, btn, resultSuggests, data) {
  let valueSearch;
  let searchItems;
  let count = 0;

  let searchResults = [];

  if (input.value == '') {
    input.addEventListener('keydown', cancel);
  }

  input.addEventListener('input', function () {
    valueSearch = input.value.toLowerCase().trim();

    input.removeEventListener('keydown', cancel);
    input.removeEventListener('keydown', stepKey);
    input.classList.remove('form-search__input_warning');

    resultSuggests.classList.remove('form-search__suggests_warning');
    resultSuggests.innerHTML = '';
    resultSuggests.style.display = 'block';

    searchResults.splice(0, searchResults.length);

    if (input.value !== '') {
      btn.style.display = 'block';

      if (valueSearch == '') {
        input.addEventListener('keydown', cancel);
      } else if (valid(valueSearch)) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.toLowerCase().includes(valueSearch)) {
            if (searchResults.length < 10) {
              searchResults.push(data[i]);
            } else {
              break;
            }
          }
        }

        displayResults(resultSuggests, searchResults);
        input.addEventListener('keydown', stepKey);
      } else {
        resultSuggests.innerHTML = '';
        resultSuggests.style.display = 'none';
        input.addEventListener('keydown', cancel);
      }
    } else {
      btn.style.display = 'none';
      resultSuggests.innerHTML = '';
      resultSuggests.style.display = 'none';
      input.addEventListener('keydown', cancel);
    }
  });

  btn.addEventListener('click', () => {
    input.classList.remove('form-search__input_warning');
    resultSuggests.classList.remove('form-search__suggests_warning');
    resultSuggests.innerHTML = '';
    resultSuggests.style.display = 'none';
    btn.style.display = 'none';
  });

  //---------------Cancel---------------
  function cancel(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      displayWarning();
    }
  }

  //--------------Show Warning--------------------
  function displayWarning() {
    const p = document.createElement('p');
    p.className = 'form-search__warning';
    p.textContent = 'Warning!!! The input field must not be empty and must contain only letters and numbers!';

    resultSuggests.innerHTML = '';
    input.classList.add('form-search__input_warning');
    resultSuggests.append(p);
    resultSuggests.classList.add('form-search__suggests_warning');
    resultSuggests.style.display = 'block';
  }

  //--------------------input Validation ------------------------
  function valid(elem) {
    const pattern = /^[a-zа-я\d\s-]+$/gi;
    return pattern.test(elem);
  }

  //---------------Controls (ArrowUp, ArrowDown, Enter)-----------
  function stepKey(e) {
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      count--;

      if (count <= 0) {
        count = searchItems.length;
      }

      searchItems.forEach(item => {
        item.classList.remove('form-search__suggests-item_active');
        item.setAttribute('aria-selected', false);

        if (count == item.dataset.suggestsIndex) {
          item.classList.add('form-search__suggests-item_active');
          item.setAttribute('aria-selected', true);
        }
      });
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      count++;
      if (count > searchItems.length) {
        count = 1;
      }

      searchItems.forEach(item => {
        item.classList.remove('form-search__suggests-item_active');
        item.setAttribute('aria-selected', false);
        if (count == item.dataset.suggestsIndex) {
          item.classList.add('form-search__suggests-item_active');
          item.setAttribute('aria-selected', true);
        }
      });
    } else if (e.code === 'Enter') {
      e.preventDefault();
      let linkHref;

      for (let i = 0; i < searchItems.length; i++) {
        if (searchItems[i].getAttribute('aria-selected') == 'true') {
          linkHref = searchItems[i].querySelector('.form-search__link').href;
          break;
        }
      }

      if (linkHref) {
        window.location.href = linkHref;
      } else {
        window.location.href = 'http://localhost:5173/catalog' + valueSearch;
      }
    }
  }

  //------------------------Show Results----------------------
  function displayResults(elem, array) {
    count = 0;
    createResults(elem, array);
    searchItems = document.querySelectorAll('.form-search__suggests-item');
  }
}
