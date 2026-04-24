'use strict';

export function selectDetailsProduct() {
  const labelFormColors = document.querySelectorAll('.info__form-colors-label');

  if (labelFormColors.length > 0) {
    labelFormColors.forEach(item => {
      item.addEventListener('click', selectColor);
      item.addEventListener('keydown', selectColorEnter);
    });
  }

  function selectColor(event) {
    labelBorderColor(event, labelFormColors);
  }

  function selectColorEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      labelBorderColor(event, labelFormColors);
    }
  }

  function labelBorderColor(event, elem) {
    elem.forEach(item => {
      item.style.borderColor = '#fff';
    });

    event.currentTarget.style.borderColor = 'blue';
    console.log(event.currentTarget.control.value);
  }
}
