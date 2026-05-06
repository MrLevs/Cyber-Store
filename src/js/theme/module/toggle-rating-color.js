'use strict';

export function toggleRatingColor() {
  const ratingBlock = document.querySelector('#rating');

  if (ratingBlock) {
    const ratingSvg = ratingBlock.querySelectorAll('.rating__svg');
    ratingSvg.forEach(item => {
      const linearGradient = item.querySelector('linearGradient');
      const stop = linearGradient.lastElementChild;

      if (document.documentElement.classList.contains('theme-dark')) {
        stop.setAttribute('stop-color', '#181818');
      } else {
        stop.setAttribute('stop-color', '#fafafa');
      }
    });
  }
}
