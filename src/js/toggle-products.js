'use strict';

export function toggleProducts() {
  const button = document.querySelectorAll('.products__btn');
  const container = document.querySelectorAll('.products__items');

  button.forEach(item => {
    let value = Object.values(item.dataset).at(-1);

    if (item.dataset === button[0].dataset) {
      item.classList.add('products__btn_active');
      loop(value);
    }

    item.addEventListener('click', () => {
      button.forEach(item => {
        item.classList.remove('products__btn_active');
      });

      item.classList.add('products__btn_active');
      loop(value);
    });

    item.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();

        button.forEach(item => {
          item.classList.remove('products__btn_active');
        });

        item.classList.add('products__btn_active');
        loop(value);
      }
    });
  });

  function loop(value) {
    container.forEach(item => {
      let elem = item.querySelector('.products__item');
      elem.style.transform = 'scaleX(0)';
      item.style.display = 'none';

      if (item.classList.contains(value)) {
        item.style.display = 'block';
        setTimeout(() => {
          elem.style.transform = 'scaleX(1)';
        }, 100);
      }
    });
  }
}
