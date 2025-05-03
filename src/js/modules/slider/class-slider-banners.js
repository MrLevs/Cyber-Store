'use strict';

import Slider from './class-slider';

export default class SliderBanners extends Slider {
  constructor(item) {
    super(item);
    this.ol;
  }

  createIndicators() {
    if (!this.ol) {
      this.ol = document.createElement('ol');
      this.ol.className = 'banners__indicators';
      this.ol.style.width = 2 * this.slide.length + 'rem';
      this.indicatorsBox.append(this.ol);

      for (let i = 0; i < this.slide.length; i++) {
        const li = document.createElement('li');
        li.className = 'slider__indicator';
        li.classList.add('banners__indicator');
        li.dataset.slide = i;
        this.ol.append(li);
      }

      this.indicator = this.item.querySelectorAll('.slider__indicator');
      this.indicator.forEach(item => {
        if (this.slide.length > 4) {
          item.style.left = '4rem';
        }
        item.addEventListener('click', () => {
          this.count = item.dataset.slide;
          this.indicatorActive();
          this.rollSlider();
        });
      });
    }
  }

  indicatorActive() {
    this.indicator.forEach((item, index) => {
      if (item.dataset.slide == this.count) {
        this.indicator.forEach(item => {
          item.style.opacity = '0.1';
          item.style.transform = 'scale(0.5)';
        });

        if (this.slide.length > 4) {
          if (index == this.count && index !== 0 && index !== this.indicator.length - 1) {
            this.indicator[index - 1].style.transform = 'scale(0.75)';
            this.indicator[index - 1].style.opacity = '0.4';
            this.indicator[index + 1].style.transform = 'scale(0.75)';
            this.indicator[index + 1].style.opacity = '0.4';
            this.ol.style.right = 1.5 * (index + 1) + 'rem';
          } else if (index == this.indicator.length - 1) {
            this.indicator[index - 1].style.transform = 'scale(0.75)';
            this.indicator[index - 1].style.opacity = '0.4';
            this.ol.style.right = 1.5 * index + 'rem';
          } else {
            this.indicator[index + 1].style.transform = 'scale(0.75)';
            this.indicator[index + 1].style.opacity = '0.4';
            this.ol.style.right = 0 + 'rem';
          }
        }
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }
    });
  }

  init() {
    this.width = this.slider.offsetWidth;
    if (this.widthDevice <= 1270 && this.widthDevice > 960) {
      this.sliderLine.style.width = (this.width / 3) * this.slide.length + 'px';
    } else if (this.widthDevice <= 960 && this.widthDevice > 650) {
      this.sliderLine.style.width = (this.width / 2) * this.slide.length + 'px';
    } else if (this.widthDevice <= 650) {
      this.sliderLine.style.width = this.width * this.slide.length + 'px';
    } else {
      this.sliderLine.style.width = (this.width / 4) * this.slide.length + 'px';
    }

    this.slide.forEach(item => {
      if (this.widthDevice <= 1270 && this.widthDevice > 960) {
        item.style.width = this.width / 3 + 'px';
      } else if (this.widthDevice <= 960 && this.widthDevice > 650) {
        item.style.width = this.width / 2 + 'px';
      } else if (this.widthDevice <= 650) {
        item.style.width = this.width + 'px';
      } else {
        item.style.width = this.width / 4 + 'px';
      }

      item.style.height = 'auto';
    });

    // ---btn vision---
    if (this.slide.length <= 4 && this.widthDevice > 1270) {
      this.btnNext.style.display = 'none';
      this.btnPrev.style.display = 'none';
    }
    this.createIndicators();
    this.indicatorActive();
    this.rollSlider();
  }

  stepNext() {
    this.count++;
    if (this.widthDevice <= 1270 && this.widthDevice > 960) {
      if (this.count > this.slide.length - 3) {
        this.count = 0;
      }
    } else if (this.widthDevice <= 960 && this.widthDevice > 650) {
      if (this.count > this.slide.length - 2) {
        this.count = 0;
      }
    } else if (this.widthDevice <= 650) {
      if (this.count > this.slide.length - 1) {
        this.count = 0;
      }
    } else {
      if (this.count > this.slide.length - 4) {
        this.count = 0;
      }
    }

    this.rollSlider();
    this.indicatorActive();
  }

  stepPrev() {
    this.count--;
    if (this.widthDevice <= 1270 && this.widthDevice > 960) {
      if (this.count < 0) {
        this.count = this.slide.length - 3;
      }
    } else if (this.widthDevice <= 960 && this.widthDevice > 650) {
      if (this.count < 0) {
        this.count = this.slide.length - 2;
      }
    } else if (this.widthDevice <= 650) {
      if (this.count < 0) {
        this.count = this.slide.length - 1;
      }
    } else {
      if (this.count < 0) {
        this.count = this.slide.length - 4;
      }
    }

    this.rollSlider();
    this.indicatorActive();
  }

  rollSlider() {
    if (this.widthDevice <= 1270 && this.widthDevice > 960) {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 3) + 'px)';
    } else if (this.widthDevice <= 960 && this.widthDevice > 650) {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 2) + 'px)';
    } else if (this.widthDevice <= 650) {
      this.sliderLine.style.transform = 'translate(-' + this.count * this.width + 'px)';
    } else {
      this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 4) + 'px)';
    }
  }
}
