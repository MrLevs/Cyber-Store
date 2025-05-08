'use strict';

export default function () {
  const form = document.querySelectorAll('.form-search');
  const data = ['mobile', 'air', 'ipad', 'iphone', 'macbook'];

  form.forEach(item => {
    let input = item.querySelector('.form-search__input');
    input.addEventListener('input', function () {
      let value = input.value.toLowerCase().trim();

      data.forEach(item => {
        if (item.includes(value)) {
          console.log(item);
        }
      });
    });
  });
}
