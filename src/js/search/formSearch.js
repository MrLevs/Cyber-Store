'use strict';

import { search } from './modules/search'; //Search

export function formSearch(data) {
  const forms = document.querySelectorAll('.form-search_header');

  forms.forEach(item => {
    const input = item.querySelector('.form-search__input');
    const btn = item.querySelector('.form-search__button');
    const resultSuggests = item.querySelector('.form-search__suggests');

    resultSuggests.style.display = 'none';
    btn.style.display = 'none';

    search(input, btn, resultSuggests, data);
  });
}
