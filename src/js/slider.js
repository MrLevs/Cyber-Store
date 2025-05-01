'use strict';

export default function () {
  //---slider category-----------
  const sliderBox = document.querySelector('.slider_box');

  //---slider banners------
  const sliderBlock = document.querySelector('.slider_block');

  class Slider {
    constructor(item) {
      this.slider = item.querySelector('.slider');
      this.sliderLine = item.querySelector('.slider__line');
      this.slide = item.querySelectorAll('.slider__slide');
      this.btnNext = item.querySelector('.slider__btn-next');
      this.btnPrev = item.querySelector('.slider__btn-prev');

      this.count = 0;
      this.width;
      this.widthDevice = document.body.clientWidth;

      this.init = this.init.bind(this);
      this.stepNext = this.stepNext.bind(this);
      this.stepPrev = this.stepPrev.bind(this);

      this.init();

      window.addEventListener('resize', this.init);
      this.btnNext.addEventListener('click', this.stepNext);
      this.btnPrev.addEventListener('click', this.stepPrev);
    }

    init() {
      this.width = this.slider.offsetWidth;
      if (this.widthDevice <= 866 && this.widthDevice > 586) {
        this.sliderLine.style.width = (this.width / 4) * this.slide.length + 'px';
      } else if (this.widthDevice <= 586 && this.widthDevice > 576) {
        this.sliderLine.style.width = (this.width / 3) * this.slide.length + 'px';
      } else if (this.widthDevice <= 576) {
        this.sliderLine.style.width = (this.width / 2) * (this.slide.length / 3) + 'px';
      } else {
        this.sliderLine.style.width = (this.width / 6) * this.slide.length + 'px';
      }

      this.slide.forEach(item => {
        if (this.widthDevice <= 866 && this.widthDevice > 586) {
          item.style.width = this.width / 4 + 'px';
        } else if (this.widthDevice <= 586 && this.widthDevice > 576) {
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
      if (this.widthDevice <= 866 && this.widthDevice > 586) {
        if (this.count > this.slide.length - 4) {
          this.count = 0;
        }
      } else if (this.widthDevice <= 586 && this.widthDevice > 576) {
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
      if (this.widthDevice <= 866 && this.widthDevice > 586) {
        if (this.count < 0) {
          this.count = this.slide.length - 4;
        }
      } else if (this.widthDevice <= 586 && this.widthDevice > 576) {
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
      if (this.widthDevice <= 866 && this.widthDevice > 586) {
        this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 4) + 'px)';
      } else if (this.widthDevice <= 586 && this.widthDevice > 576) {
        this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 3) + 'px)';
      } else if (this.widthDevice <= 576) {
        this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 2) + 'px)';
      } else {
        this.sliderLine.style.transform = 'translate(-' + this.count * (this.width / 6) + 'px)';
      }
    }
  }

  new Slider(sliderBox);

  class SliderNext extends Slider {
    constructor(item) {
      super(item);
      this.indicatorsBox;
      this.ol;
      this.indicator;
    }

    createIndicators() {
      if (!this.ol) {
        console.log(this.ol);
        this.ol = document.createElement('ol');
        this.indicatorsBox = document.querySelector('.slider__box');
        this.ol.className = 'banners__indicators';
        this.ol.style.width = 2 * this.slide.length + 'rem';
        this.indicatorsBox.append(this.ol);

        for (let i = 0; i < this.slide.length; i++) {
          const li = document.createElement('li');
          li.className = 'banners__indicator';
          li.dataset.slide = i;
          this.ol.append(li);
        }

        this.indicator = document.querySelectorAll('.banners__indicator');
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
      } else {
        console.log(this.ol);
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

  new SliderNext(sliderBlock);

  // //---slider banners------
  // function sliderCreate(item) {
  //   const sliderLine = item.querySelector('.slider__line');
  //   const slide = item.querySelectorAll('.slider__slide');
  //   const indicatorsBox = item.querySelector('.slider__box');

  //   let count = 0;
  //   let width;
  //   const widthDevice = document.body.clientWidth;

  //   //---create Indicators-----------
  //   const ol = document.createElement('ol');
  //   ol.className = 'banners__indicators';
  //   ol.style.width = 2 * slide.length + 'rem';
  //   indicatorsBox.append(ol);

  //   for (let i = 0; i < slide.length; i++) {
  //     const li = document.createElement('li');
  //     li.className = 'banners__indicator';
  //     li.dataset.slide = i;
  //     ol.append(li);
  //   }

  //   const indicator = item.querySelectorAll('.banners__indicator');
  //   indicator.forEach(item => {
  //     if (slide.length > 4) {
  //       item.style.left = '4rem';
  //     }
  //     item.addEventListener('click', function () {
  //       count = item.dataset.slide;
  //       indicatorActive();
  //       rollSlider();
  //     });
  //   });

  //   function indicatorActive() {
  //     indicator.forEach((item, index) => {
  //       if (item.dataset.slide == count) {
  //         indicator.forEach(item => {
  //           item.style.opacity = '0.1';
  //           item.style.transform = 'scale(0.5)';
  //         });

  //         if (slide.length > 4) {
  //           if (index == count && index !== 0 && index !== indicator.length - 1) {
  //             indicator[index - 1].style.transform = 'scale(0.75)';
  //             indicator[index - 1].style.opacity = '0.4';
  //             indicator[index + 1].style.transform = 'scale(0.75)';
  //             indicator[index + 1].style.opacity = '0.4';
  //             ol.style.right = 1.5 * (index + 1) + 'rem';
  //           } else if (index == indicator.length - 1) {
  //             indicator[index - 1].style.transform = 'scale(0.75)';
  //             indicator[index - 1].style.opacity = '0.4';
  //             ol.style.right = 1.5 * index + 'rem';
  //           } else {
  //             indicator[index + 1].style.transform = 'scale(0.75)';
  //             indicator[index + 1].style.opacity = '0.4';
  //             ol.style.right = 0 + 'rem';
  //           }
  //         }

  //         item.style.opacity = '1';
  //         item.style.transform = 'scale(1)';
  //       }
  //     });
  //   }

  //   function init() {
  //     width = item.querySelector('.slider').offsetWidth;
  //     if (widthDevice <= 1270 && widthDevice > 960) {
  //       sliderLine.style.width = (width / 3) * slide.length + 'px';
  //     } else if (widthDevice <= 960 && widthDevice > 650) {
  //       sliderLine.style.width = (width / 2) * slide.length + 'px';
  //     } else if (widthDevice <= 650) {
  //       sliderLine.style.width = width * slide.length + 'px';
  //     } else {
  //       sliderLine.style.width = (width / 4) * slide.length + 'px';
  //     }

  //     slide.forEach(item => {
  //       if (widthDevice <= 1270 && widthDevice > 960) {
  //         item.style.width = width / 3 + 'px';
  //       } else if (widthDevice <= 960 && widthDevice > 650) {
  //         item.style.width = width / 2 + 'px';
  //       } else if (widthDevice <= 650) {
  //         item.style.width = width + 'px';
  //       } else {
  //         item.style.width = width / 4 + 'px';
  //       }

  //       item.style.height = 'auto';
  //     });

  //     // ---btn vision---
  //     if (slide.length <= 4 && widthDevice > 1270) {
  //       item.querySelector('.slider__btn-next').style.display = 'none';
  //       item.querySelector('.slider__btn-prev').style.display = 'none';
  //     }

  //     rollSlider();
  //     indicatorActive();
  //   }

  //   window.addEventListener('resize', init);
  //   init();

  //   item.querySelector('.slider__btn-next').addEventListener('click', function () {
  //     count++;
  //     if (widthDevice <= 1270 && widthDevice > 960) {
  //       if (count > slide.length - 3) {
  //         count = 0;
  //       }
  //     } else if (widthDevice <= 960 && widthDevice > 650) {
  //       if (count > slide.length - 2) {
  //         count = 0;
  //       }
  //     } else if (widthDevice <= 650) {
  //       if (count > slide.length - 1) {
  //         count = 0;
  //       }
  //     } else {
  //       if (count > slide.length - 4) {
  //         count = 0;
  //       }
  //     }

  //     rollSlider();
  //     indicatorActive();
  //   });

  //   item.querySelector('.slider__btn-prev').addEventListener('click', function () {
  //     count--;
  //     if (widthDevice <= 1270 && widthDevice > 960) {
  //       if (count < 0) {
  //         count = slide.length - 3;
  //       }
  //     } else if (widthDevice <= 960 && widthDevice > 650) {
  //       if (count < 0) {
  //         count = slide.length - 2;
  //       }
  //     } else if (widthDevice <= 650) {
  //       if (count < 0) {
  //         count = slide.length - 1;
  //       }
  //     } else {
  //       if (count < 0) {
  //         count = slide.length - 4;
  //       }
  //     }

  //     rollSlider();
  //     indicatorActive();
  //   });

  //   function rollSlider() {
  //     if (widthDevice <= 1270 && widthDevice > 960) {
  //       sliderLine.style.transform = 'translate(-' + count * (width / 3) + 'px)';
  //     } else if (widthDevice <= 960 && widthDevice > 650) {
  //       sliderLine.style.transform = 'translate(-' + count * (width / 2) + 'px)';
  //     } else if (widthDevice <= 650) {
  //       sliderLine.style.transform = 'translate(-' + count * width + 'px)';
  //     } else {
  //       sliderLine.style.transform = 'translate(-' + count * (width / 4) + 'px)';
  //     }
  //   }
  // }

  //---slider category-----------
  // sliderWork(sliderBox);

  //---slider banners------
  // sliderCreate(sliderBlock);
}
