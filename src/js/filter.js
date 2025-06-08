'use strict';

export default function () {
  const details = document.querySelectorAll('.filters__details');
  const label = document.querySelectorAll('.filters__label');
  let valueM = [];

  details.forEach(item => {
    let summary = item.querySelector('.filters__summary');
    summary.addEventListener('click', function () {
      if (item.hasAttribute('open')) {
        item.classList.remove('filters__details_active');
      } else {
        item.classList.add('filters__details_active');
      }
    });
  });

  label.forEach(item => {
    item.addEventListener('click', function () {
      if (this.control.checked) {
        item.classList.remove('filters__label_active');
        let valFilter = valueM.filter(val => val !== this.control.value);
        valueM = valFilter;
        console.log(valueM);
      } else {
        item.classList.add('filters__label_active');
        valueM.push(this.control.value);
        console.log(valueM);
      }
    });
  });
}
