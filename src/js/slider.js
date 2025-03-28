'use strict';

export default function () {
  const slider = document.querySelector('.slider');
  const sliderContainer = document.querySelector('.slider__container');
  const slides = document.querySelectorAll('.slider__slide');

  const btnPrev = document.querySelector('.slider__btn-prev');
  const btnNext = document.querySelector('.slider__btn-next');

  let count = 0;
  let width;

  function init() {
    console.log('resize');
    let a = document.documentElement.clientWidth;
    width = slider.getBoundingClientRect();
    if (a <= 1230) {
      slider.style.width = a - 30 + 'px';
    }
    // sliderContainer.style.width = width * slides.length + 'px';
    // slides.forEach(item => {
    //   item.style.width = width + 'px';
    //   item.style.height = 'auto';
    // });
    // rollSlider();
    console.log(`экран ${a}`);
    console.log(width);
  }
  window.addEventListener('resize', init);
  init();

  btnPrev.addEventListener('click', movePrev);
  btnNext.addEventListener('click', moveNext);

  function movePrev() {
    count--;
    if (count < 0) {
      count = slides.length - 1;
    }
    rollSlider();
  }

  function moveNext() {
    count++;
    if (count >= slides.length) {
      count = 0;
    }
    console.log(count);
    rollSlider();
  }

  function rollSlider() {
    sliderContainer.style.transform = 'translate(-' + count * width + 'px)';
  }
}
