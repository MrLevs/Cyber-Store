'use strict';

export default function () {
  const forms = document.querySelectorAll('.form-search_header');
  let data;

  forms.forEach(item => {
    const input = item.querySelector('.form-search__input');
    const btn = item.querySelector('.form-search__button');
    const resultSuggests = item.querySelector('.form-search__suggests');

    resultSuggests.style.display = 'none';
    btn.style.display = 'none';

    search(input, btn, resultSuggests);
  });

  async function fetchData() {
    let response = await fetch('/data.json');
    let result = await response.json();
    data = result.map(({ name, link }) => ({
      name: name.toLowerCase(),
      link: link,
    }));
  }

  fetchData();

  function search(input, btn, resultSuggests) {
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
            if (data[i].name.includes(valueSearch)) {
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
      elem.innerHTML = '';
      count = 0;

      const ul = document.createElement('ul');
      ul.className = 'form-search__suggests-list';
      ul.setAttribute('role', 'listbox');
      ul.setAttribute('aria-labelledby', 'lable-search');

      array.forEach((item, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        li.className = 'form-search__suggests-item';
        li.dataset.suggestsIndex = index + 1;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', false);

        a.className = 'form-search__link';
        a.setAttribute('href', `${item.link}`);

        div.className = 'form-search__suggests-box';
        span.className = 'form-search__suggests-text';
        span.textContent = item.name;

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
      });
      searchItems = document.querySelectorAll('.form-search__suggests-item');
    }
  }
}
