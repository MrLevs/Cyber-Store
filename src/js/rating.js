'use strict';

export function rating() {
  const ratingBlock = document.querySelector('#rating');

  if (ratingBlock) {
    const ratingSvg = ratingBlock.querySelectorAll('.rating__svg');
    const ratingTitle = ratingBlock.querySelector('.rating__value');
    const ratingQT = ratingBlock.querySelector('.rating__qt');
    let ratingValue = '4.8';
    let ratingValueArr = ratingValue.split('.');
    let ratingReviewsAll = '125';
    let num1 = parseInt(ratingValueArr[0], 10);
    let num2;

    if (ratingValueArr[1].length === 1) {
      if (ratingValueArr[1] === '0') {
        num2 = parseInt(ratingValueArr[1], 10);
      } else {
        num2 = parseInt(ratingValueArr[1], 10) * 10;
      }
    } else if (ratingValueArr[1].length === 2) {
      if (ratingValueArr[1].startsWith('0')) {
        num2 = parseInt(ratingValueArr[1].replace(/0/, ''), 10);
      } else {
        num2 = parseInt(ratingValueArr[1], 10);
      }
    }

    ratingTitle.textContent = ratingValue;
    ratingQT.textContent = `of ${ratingReviewsAll} reviews`;

    for (let i = 0; i < ratingSvg.length; i++) {
      if (i < num1) {
        createLinearGradient(ratingSvg[i], 100);
      } else if (i === num1 && num2) {
        createLinearGradient(ratingSvg[i], num2);
      } else {
        createLinearGradient(ratingSvg[i], 0);
      }
    }

    function createLinearGradient(item, num1) {
      const defs = item.querySelector('defs');
      const svgNS = 'http://www.w3.org/2000/svg';
      const linearGradient = document.createElementNS(svgNS, 'linearGradient');
      let stopAtrVal;

      if (document.documentElement.classList.contains('theme-dark')) {
        stopAtrVal = [
          {
            color: '#FFB547',
            offset: `${num1}%`,
          },
          {
            color: '#181818',
            offset: `0%`,
          },
        ];
      } else {
        stopAtrVal = [
          {
            color: '#FFB547',
            offset: `${num1}%`,
          },
          {
            color: '#fafafa',
            offset: `0%`,
          },
        ];
      }

      defs.innerHTML = '';
      linearGradient.setAttribute('id', item.dataset.id);

      for (let i = 0, length = stopAtrVal.length; i < length; i++) {
        const stop = document.createElementNS(svgNS, 'stop');
        stop.setAttribute('offset', stopAtrVal[i].offset);
        stop.setAttribute('stop-color', stopAtrVal[i].color);

        linearGradient.append(stop);
      }
      defs.append(linearGradient);
    }
  }
}
