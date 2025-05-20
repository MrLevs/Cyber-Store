'use strict';

export default function () {
  const forms = document.querySelectorAll('.form-search');

  const searchResults = [];
  const data = ['mobile', 'air', 'ipad', 'iphone', 'macbook', 'macmini', 'imac', 'iphone 16', 'macbook 16 pro max'];

  forms.forEach(item => {
    const input = item.querySelector('.form-search__input');
    const btn = item.querySelector('.form-search__button');
    const resultSuggests = item.querySelector('.form-search__suggests');

    resultSuggests.style.display = 'none';
    btn.style.display = 'none';

    input.addEventListener('input', function () {
      let value = input.value.toLowerCase().trim();

      resultSuggests.style.display = 'block';
      searchResults.splice(0, searchResults.length);

      if (valid(input.value)) {
        btn.style.display = 'block';
        if (value !== '') {
          data.forEach(item => {
            if (item.includes(value)) {
              searchResults.push(item);
            }
          });
          displayResults(resultSuggests, searchResults);
        }
      } else {
        if (input.value !== '') {
          btn.style.display = 'block';
        } else {
          btn.style.display = 'none';
        }
        resultSuggests.innerHTML = '';
        resultSuggests.style.display = 'none';
        input.addEventListener('keydown', e => {
          if (e.code === 'Enter') {
            e.preventDefault();
            alert('Поле ввода должно содержать только буквы и цифры!!!');
          }
        });
      }
    });

    btn.addEventListener('click', () => {
      resultSuggests.innerHTML = '';
      resultSuggests.style.display = 'none';
      btn.style.display = 'none';
    });
  });

  function valid(elem) {
    const pattern = /^[a-zа-я\d\s-]+$/gi;
    console.log(typeof elem);
    return pattern.test(elem);
  }

  function displayResults(elem, array) {
    elem.innerHTML = '';
    console.log(array);

    const ul = document.createElement('ul');
    ul.className = 'form-search__suggests-list';

    array.forEach((item, index) => {
      if (index <= 9) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        li.className = 'form-search__suggests-item';

        a.className = 'form-search__link';
        a.setAttribute('href', '#');

        div.className = 'form-search__suggests-box';
        span.className = 'form-search__suggests-text';
        span.textContent = item;

        svg.setAttribute('width', '18');
        svg.setAttribute('height', '18');
        svg.setAttribute('viewBox', '0 0 18 18');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('class', 'form-search__suggests-svg');

        path.setAttribute(
          'd',
          'M16.9331 17L13.1554 13.2156M15.2489 8.15789C15.2489 10.0563 14.4948 11.8769 13.1524 13.2193C11.81 14.5617 9.98939 15.3158 8.091 15.3158C6.19261 15.3158 4.37197 14.5617 3.0296 13.2193C1.68724 11.8769 0.933105 10.0563 0.933105 8.15789C0.933105 6.2595 1.68724 4.43886 3.0296 3.0965C4.37197 1.75413 6.19261 1 8.091 1C9.98939 1 11.81 1.75413 13.1524 3.0965C14.4948 4.43886 15.2489 6.2595 15.2489 8.15789V8.15789Z',
        );
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-linecap', 'round');

        svg.append(path);
        div.append(svg);
        div.append(span);
        a.append(div);
        li.append(a);
        ul.append(li);
        elem.append(ul);
      } else {
        return;
      }
    });
  }
}
// aria-selected li
// снять eventlistener, решить вопрос с пустым Input
