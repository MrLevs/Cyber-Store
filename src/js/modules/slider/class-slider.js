'use strict';

export class Slider {
  constructor(item) {
    this.item = item;
    this.slider = item.querySelector('.slider');
    this.sliderLine = item.querySelector('.slider__line');
    this.slide = item.querySelectorAll('.slider__slide');
    this.btnNext = item.querySelector('.slider__btn-next');
    this.btnPrev = item.querySelector('.slider__btn-prev');
    this.indicatorsBox = document.querySelector('.slider__indicators');
    this.indicator;

    this.count = 0;
    this.width;
    this.widthDevice = document.body.clientWidth;
    this.pointerDown;
    this.pointerUp;

    this.init = this.init.bind(this);
    this.stepNext = this.stepNext.bind(this);
    this.stepPrev = this.stepPrev.bind(this);

    this.init();
    this.tochMove();

    window.addEventListener('resize', this.init);
    this.btnNext.addEventListener('click', this.stepNext);
    this.btnPrev.addEventListener('click', this.stepPrev);
  }

  init() {
    this.width = this.slider.offsetWidth;
    if (this.widthDevice <= 866 && this.widthDevice > 613) {
      this.sliderLine.style.width = (this.width / 4) * this.slide.length + 'px';
    } else if (this.widthDevice <= 613 && this.widthDevice > 576) {
      this.sliderLine.style.width = (this.width / 3) * this.slide.length + 'px';
    } else if (this.widthDevice <= 576) {
      this.sliderLine.style.width = (this.width / 2) * (this.slide.length / 3) + 'px';
    } else {
      this.sliderLine.style.width = (this.width / 6) * this.slide.length + 'px';
    }

    this.slide.forEach(item => {
      if (this.widthDevice <= 866 && this.widthDevice > 613) {
        item.style.width = this.width / 4 + 'px';
      } else if (this.widthDevice <= 613 && this.widthDevice > 576) {
        item.style.width = this.width / 3 + 'px';
      } else if (this.widthDevice <= 576) {
        item.style.width = this.width / 2.1 + 'px';
      } else {
        item.style.width = this.width / 6 + 'px';
      }

      item.style.height = 'auto';
    });
    this.rollSlider();
  }

  stepNext() {
    this.count++;
    if (this.widthDevice <= 866 && this.widthDevice > 613) {
      if (this.count > this.slide.length - 4) {
        this.count = 0;
      }
    } else if (this.widthDevice <= 613 && this.widthDevice > 576) {
      if (this.count > this.slide.length - 3) {
        this.count = 0;
      }
    } else if (this.widthDevice <= 576) {
      if (this.count > this.slide.length / 6) {
        this.count = 0;
      }
    } else {
      if (this.count > this.slide.length / 2) {
        this.count = 0;
      }
    }

    this.rollSlider();
  }

  stepPrev() {
    this.count--;
    if (this.widthDevice <= 866 && this.widthDevice > 613) {
      if (this.count < 0) {
        this.count = this.slide.length - 4;
      }
    } else if (this.widthDevice <= 613 && this.widthDevice > 576) {
      if (this.count < 0) {
        this.count = this.slide.length - 3;
      }
    } else if (this.widthDevice <= 576) {
      if (this.count < 0) {
        this.count = this.slide.length / 6;
      }
    } else {
      if (this.count < 0) {
        this.count = this.slide.length / 2;
      }
    }

    this.rollSlider();
  }

  rollSlider() {
    if (this.widthDevice <= 866 && this.widthDevice > 613) {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 4) + 'px)';
    } else if (this.widthDevice <= 613 && this.widthDevice > 576) {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 3) + 'px)';
    } else if (this.widthDevice <= 576) {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 2) + 'px)';
    } else {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 6) + 'px)';
    }
  }

  tochMove() {
    this.slider.addEventListener('pointerdown', e => {
      e.preventDefault();
      this.pointerDown = e.clientX;
    });
    this.slider.addEventListener('pointerup', e => {
      this.pointerUp = e.clientX;
      let link = this.item.querySelectorAll('a');
      link.forEach(item => {
        item.addEventListener('click', e => {
          if (this.pointerDown != this.pointerUp) {
            e.preventDefault();
          }
        });
      });
      if (this.pointerDown > this.pointerUp) {
        this.stepNext();
      } else if (this.pointerDown < this.pointerUp) {
        this.stepPrev();
      }
    });
  }
}
