'use strict';

export default function () {
  const forms = document.querySelectorAll('.form-search');

  const searchResults = [];
  const data = ['mobile', 'air', 'ipad', 'iphone', 'macbook', 'macmini', 'imac'];

  forms.forEach(item => {
    const input = item.querySelector('.form-search__input');
    const btn = item.querySelector('.form-search__button');
    const resultSuggests = item.querySelector('.form-search__suggests');

    resultSuggests.style.display = 'none';

    input.addEventListener('input', function () {
      let value = input.value.toLowerCase().trim();

      resultSuggests.style.display = 'block';
      searchResults.splice(0, searchResults.length);

      if (valid(value)) {
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
      } else {
        if (value == ' ') {
          console.log(1111);
        }
        console.log('error');
        resultSuggests.innerHTML = '';
        resultSuggests.style.display = 'none';
        btn.style.display = 'none';
      }
    });

    btn.addEventListener('click', () => {
      resultSuggests.innerHTML = '';
      resultSuggests.style.display = 'none';
      btn.style.display = 'none';
    });
  });

  function valid(elem) {
    const pattern = /^[a-zA-Zа-яА-яёЁ0-9\s]+$/;
    return pattern.test(elem);
  }

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
