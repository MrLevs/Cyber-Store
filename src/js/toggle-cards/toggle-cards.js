'use strict';

export function toggleCards() {
  const button = document.querySelectorAll('.payment__form-button');
  const container = document.querySelectorAll('.payment__box-info-inner');

  button.forEach(item => {
    let value = Object.values(item.dataset).at(-1);

    if (item.dataset === button[0].dataset) {
      item.classList.add('payment__form-button_active');
      loop(value);
    }

    item.addEventListener('click', function () {
      button.forEach(item => {
        item.classList.remove('payment__form-button_active');
      });

      item.classList.add('payment__form-button_active');
      loop(value);
    });
  });

  function loop(value) {
    container.forEach(item => {
      let elem = item.querySelector('.payment__box-info-item');
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
