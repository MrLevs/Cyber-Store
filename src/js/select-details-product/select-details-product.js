'use strict';

export function selectDetailsProduct() {
  const labelFormColors = document.querySelectorAll('.info__form-colors-label');
  const labelFormMemory = document.querySelectorAll('.info__form-memory-label');

  //-----Form Colors--------------------------
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
      event.currentTarget.control.checked = true;
      labelBorderColor(event, labelFormColors);
    }
  }

  function labelBorderColor(event, elem) {
    const html = document.querySelector('html');
    elem.forEach(item => {
      if (html.classList.contains('root')) {
        item.style.borderColor = '#fff';
      } else {
        item.style.borderColor = '#1f2020';
      }
    });

    event.currentTarget.style.borderColor = 'blue';
  }
  //-------------------------------------------------
  //-----Form Memory----------------------------
  if (labelFormMemory.length > 0) {
    labelFormMemory.forEach(item => {
      item.addEventListener('click', selectMemory);
      item.addEventListener('keydown', selectMemoryEnter);
    });
  }

  function selectMemory(event) {
    BorderColorFormMemory(event, labelFormMemory);
  }

  function selectMemoryEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      event.currentTarget.control.checked = true;
      BorderColorFormMemory(event, labelFormMemory);
    }
  }

  function BorderColorFormMemory(event, elem) {
    const html = document.querySelector('html');
    elem.forEach(item => {
      if (html.classList.contains('root')) {
        item.style.borderColor = '#000';
      } else {
        item.style.borderColor = '#fff';
      }
      item.style.opacity = '0.6';
    });

    event.currentTarget.style.borderColor = 'blue';
    event.currentTarget.style.opacity = '1';
  }
  //---------------------------------------------
  //---Gradient SVG------------- Доделать расчет звезд и заливки!!!!
  const ratingSvg = document.querySelectorAll('.rating__svg');
  let procent = 60;
  let val = procent / 20;

  for (let i = 0; i <= ratingSvg.length; i++) {
    console.log(i, ratingSvg[i]);
    createLinearGradient(ratingSvg[i], 100, 0);

    if (i === val - 1) {
      console.log('stop');
      break;
    }
  }

  // ratingSvg.forEach(item => {
  //   switch (item.getAttribute('fill')) {
  //     case 'url(#grad1)':
  //       createLinearGradient(item, 40, 60);
  //       break;
  //     case 'url(#grad2)':
  //       console.log(5);
  //       break;
  //     case 'url(#grad3)':
  //       console.log(5);
  //       break;
  //     case 'url(#grad4)':
  //       console.log(5);
  //       break;
  //     case 'url(#grad5)':
  //       console.log(5);
  //       break;
  //   }
  // });

  function createLinearGradient(item, num1, num2) {
    const defs = item.querySelector('defs');
    const svgNS = 'http://www.w3.org/2000/svg';
    const linearGradient = document.createElementNS(svgNS, 'linearGradient');
    let stopAtrVal = [
      {
        color: '#FFB547',
        offset: `${num1}%`,
      },
      {
        color: '#fff',
        offset: `${num2}%`,
      },
    ];

    defs.innerHTML = '';
    linearGradient.setAttribute('id', item.dataset.id);
    for (let i = 0, length = stopAtrVal.length; i < length; i++) {
      const stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', stopAtrVal[i].offset);
      stop.setAttribute('stop-color', stopAtrVal[i].color);

      linearGradient.append(stop);
    }
    console.log(stopAtrVal);
    defs.append(linearGradient);
  }
}
