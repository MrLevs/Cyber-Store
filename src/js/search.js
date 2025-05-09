'use strict';

export default function () {
  const form = document.querySelectorAll('.form-search');

  const searchResults = [];
  const data = ['mobile', 'air', 'ipad', 'iphone', 'macbook', 'macmini', 'imac'];

  form.forEach(item => {
    const input = item.querySelector('.form-search__input');
    const btn = item.querySelector('.form-search__button');
    const resultSuggests = item.querySelector('.form-search__suggests');

    resultSuggests.style.display = 'none';

    input.addEventListener('input', function () {
      let value = input.value.toLowerCase().trim();

      resultSuggests.style.display = 'block';
      searchResults.splice(0, searchResults.length);

      if (value !== '') {
        btn.style.display = 'block';
        data.forEach(item => {
          if (item.includes(value)) {
            searchResults.push(item);
          }
        });
      } else {
        resultSuggests.innerHTML = '';
        resultSuggests.style.display = 'none';
        btn.style.display = 'none';
      }

      displayResults(resultSuggests, searchResults);
    });

    btn.addEventListener('click', () => {
      resultSuggests.innerHTML = '';
      resultSuggests.style.display = 'none';
      btn.style.display = 'none';
    });
  });

  function displayResults(elem, array) {
    elem.innerHTML = '';

    const ul = document.createElement('ul');
    ul.className = 'form-search__suggests-list';

    array.forEach((item, index) => {
      if (index <= 9) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.className = 'form-search__link';
        a.setAttribute('href', '#');
        a.textContent = item;

        li.append(a);
        ul.append(li);
        elem.append(ul);
      } else {
        return;
      }
    });
  }
}
// Осуществить проверку на защиту ввода в инпут
