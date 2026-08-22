'use strict';

export function selectBigImg() {
  const imgMin = document.querySelectorAll('.info__img_min');
  const imgMax = document.querySelector('#img-product-max');

  if (imgMin.length > 0) {
    imgMin.forEach(item => {
      item.addEventListener('click', () => {
        enlargeImg(item);
      });
      item.addEventListener('keydown', event => {
        if (event.code === 'Enter') {
          event.preventDefault();
          enlargeImg(item);
        }
      });
    });
  }

  function enlargeImg(item) {
    imgMin.forEach(item => {
      item.classList.remove('info__img_active');
    });

    item.classList.add('info__img_active');
    imgMax.src = item.getAttribute('data-large');
  }
}
