'use strict';

export function toggleBorderColor() {
  const labelFormColors = document.querySelectorAll('.info__form-colors-label'); // product-details.html

  if (labelFormColors.length > 0) {
    labelFormColors.forEach(item => {
      if (document.documentElement.classList.contains('root')) {
        item.style.borderColor = '#fff';
      } else {
        item.style.borderColor = '#1f2020';
      }
      if (item.control.checked) {
        item.style.borderColor = 'blue';
      }
    });
  }
}

export function toggleBorderColorMemory() {
  const labelFormMemory = document.querySelectorAll('.info__form-memory-label'); // product-details.html

  if (labelFormMemory.length > 0) {
    labelFormMemory.forEach(item => {
      if (document.documentElement.classList.contains('root')) {
        item.style.borderColor = '#000';
      } else {
        item.style.borderColor = '#fff';
      }
      item.style.opacity = '0.6';

      if (item.control.checked) {
        item.style.borderColor = 'blue';
        item.style.opacity = '1';
      }
    });
  }
}
