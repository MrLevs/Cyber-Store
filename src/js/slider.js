'use strict';

export default function () {
  const sliderBox = document.querySelector('._slider-box');

  function sliderWork(item) {
    const sliderLine = item.querySelector('.slider__line');
    const slide = item.querySelectorAll('.slider__slide');

    let count = 0;
    let width;
    const widthDevice = document.body.clientWidth;
    function init() {
      width = item.querySelector('.slider').offsetWidth;
      if (widthDevice <= 866 && widthDevice > 586) {
        sliderLine.style.width = (width / 4) * slide.length + 'px';
      } else if (widthDevice <= 586 && widthDevice > 576) {
        sliderLine.style.width = (width / 3) * slide.length + 'px';
      } else if (widthDevice <= 576) {
        sliderLine.style.width = (width / 2) * (slide.length / 3) + 'px';
      } else {
        sliderLine.style.width = (width / 6) * slide.length + 'px';
      }
      slide.forEach(item => {
        if (widthDevice <= 866 && widthDevice > 586) {
          item.style.width = width / 4 + 'px';
        } else if (widthDevice <= 586 && widthDevice > 576) {
          item.style.width = width / 3 + 'px';
        } else if (widthDevice <= 576) {
          item.style.width = width / 2.1 + 'px';
        } else {
          item.style.width = width / 6 + 'px';
        }

        item.style.height = 'auto';
      });
      rollSlider();
    }

    window.addEventListener('resize', init);
    init();

    item.querySelector('.slider__btn-next').addEventListener('click', function () {
      count++;
      if (widthDevice <= 866 && widthDevice > 586) {
        if (count > slide.length - 4) {
          count = 0;
        }
      } else if (widthDevice <= 586 && widthDevice > 576) {
        if (count > slide.length - 3) {
          count = 0;
        }
      } else if (widthDevice <= 576) {
        if (count > slide.length / 6) {
          count = 0;
        }
      } else {
        if (count > slide.length / 2) {
          count = 0;
        }
      }

      rollSlider();
    });

    item.querySelector('.slider__btn-prev').addEventListener('click', function () {
      count--;
      if (widthDevice <= 866 && widthDevice > 586) {
        if (count < 0) {
          count = slide.length - 4;
        }
      } else if (widthDevice <= 586 && widthDevice > 576) {
        if (count < 0) {
          count = slide.length - 3;
        }
      } else if (widthDevice <= 576) {
        if (count < 0) {
          count = slide.length / 6;
        }
      } else {
        if (count < 0) {
          count = slide.length / 2;
        }
      }

      rollSlider();
    });

    function rollSlider() {
      if (widthDevice <= 866 && widthDevice > 586) {
        sliderLine.style.transform = 'translate(-' + count * (width / 4) + 'px)';
      } else if (widthDevice <= 586 && widthDevice > 576) {
        sliderLine.style.transform = 'translate(-' + count * (width / 3) + 'px)';
      } else if (widthDevice <= 576) {
        sliderLine.style.transform = 'translate(-' + count * (width / 2) + 'px)';
      } else {
        sliderLine.style.transform = 'translate(-' + count * (width / 6) + 'px)';
      }
    }
  }

  sliderWork(sliderBox);
}
