'use strict';

export function rating(objStat) {
  const ratingBlock = document.querySelector('#rating');

  if (!ratingBlock) return;

  const ratingSvg = ratingBlock.querySelectorAll('.rating__svg');
  const ratingAverage = ratingBlock.querySelector('.rating__value');
  const ratingTotal = ratingBlock.querySelector('.rating__qt');
  let average = objStat.average;
  let total = objStat.total;
  let num1 = Math.floor(average);
  let num2 = Math.round((average % 1) * 100);

  ratingAverage.textContent = average;
  ratingTotal.textContent = `of ${total} reviews`;

  ratingSvg.forEach((item, index) => {
    if (index < num1) {
      createLinearGradient(item, 100);
    } else if (index === num1 && num2) {
      createLinearGradient(item, num2);
    } else {
      createLinearGradient(item, 0);
    }
  });

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
