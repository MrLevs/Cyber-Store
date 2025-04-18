'use strict';

export default function () {
  //---slider category-----------
  const sliderBox = document.querySelector('.slider_box');

  //---slider banners------
  const sliderBlock = document.querySelector('.slider_block');

  //---slider category-----------
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

  //---slider banners------
  function sliderCreate(item) {
    const sliderLine = item.querySelector('.slider__line');
    const slide = item.querySelectorAll('.slider__slide');
    const indicatorsBox = item.querySelector('.slider__box');

    //---create Indicators-----------
    const ol = document.createElement('ol');
    ol.className = 'banners__indicators';
    ol.style.width = 2 * slide.length + 'rem';
    indicatorsBox.append(ol);

    for (let i = 0; i < slide.length; i++) {
      const li = document.createElement('li');
      li.className = 'banners__indicator';
      li.dataset.slide = i;
      ol.append(li);
    }

    let count = 0;
    let width;
    const widthDevice = document.body.clientWidth;

    const indicator = item.querySelectorAll('.banners__indicator');
    indicator.forEach(item => {
      item.addEventListener('click', function () {
        indicator.forEach(item => {
          item.style.opacity = '0.1';
        });
        count = item.dataset.slide;
        item.style.opacity = '1';
        rollSlider();
      });
    });

    function indicatorActive() {
      indicator.forEach((item, index) => {
        if (index == count && index == 0) {
          indicator[index + 1].style.transform = 'scale(0.75)';
          indicator[index + 1].style.opacity = '0.4';
        }
        if (item.dataset.slide == count) {
          item.style.opacity = '1';
        }
      });
    }

    function indicatorDynamic() {
      if (slide.length > 4) {
        let indicatorContainer = document.querySelector('.banners__box');
        indicatorContainer.classList.add('banners__box_dynamic');

        indicator.forEach((item, index) => {
          item.style.left = '4rem';
          item.style.transform = 'scale(0.5)';
          if (item.dataset.slide == count) {
            item.style.transform = 'scale(1)';
          }

          item.addEventListener('click', function () {
            indicator.forEach(item => {
              item.style.backgroundColor = 'black';
              item.style.opacity = '0.1';
              item.style.transform = 'scale(0.5)';
            });

            if (index == count && index !== 0 && index !== indicator.length - 1) {
              indicator[index - 1].style.transform = 'scale(0.75)';
              indicator[index - 1].style.opacity = '0.4';
              indicator[index + 1].style.transform = 'scale(0.75)';
              indicator[index + 1].style.opacity = '0.4';
              ol.style.right = 1.5 * (index + 1) + 'rem';
            } else if (index == indicator.length - 1) {
              indicator[index - 1].style.transform = 'scale(0.75)';
              indicator[index - 1].style.opacity = '0.4';
            } else {
              indicator[index + 1].style.transform = 'scale(0.75)';
              indicator[index + 1].style.opacity = '0.4';
              ol.style.right = 0 + 'rem';
            }

            count = item.dataset.slide;
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
            rollSlider();
          });
        });
      }
    }
    indicatorDynamic();

    function init() {
      width = item.querySelector('.slider').offsetWidth;
      if (widthDevice <= 1270 && widthDevice > 960) {
        sliderLine.style.width = (width / 3) * slide.length + 'px';
      } else if (widthDevice <= 960 && widthDevice > 650) {
        sliderLine.style.width = (width / 2) * slide.length + 'px';
      } else if (widthDevice <= 650) {
        sliderLine.style.width = width * slide.length + 'px';
      } else {
        sliderLine.style.width = (width / 4) * slide.length + 'px';
      }

      slide.forEach(item => {
        if (widthDevice <= 1270 && widthDevice > 960) {
          item.style.width = width / 3 + 'px';
        } else if (widthDevice <= 960 && widthDevice > 650) {
          item.style.width = width / 2 + 'px';
        } else if (widthDevice <= 650) {
          item.style.width = width + 'px';
        } else {
          item.style.width = width / 4 + 'px';
        }

        item.style.height = 'auto';
      });

      // ---btn vision---
      if (slide.length <= 4 && widthDevice > 1270) {
        item.querySelector('.slider__btn-next').style.display = 'none';
        item.querySelector('.slider__btn-prev').style.display = 'none';
      }

      rollSlider();
      indicatorActive();
    }

    window.addEventListener('resize', init);
    init();

    item.querySelector('.slider__btn-next').addEventListener('click', function () {
      count++;
      if (widthDevice <= 1270 && widthDevice > 960) {
        if (count > slide.length - 3) {
          count = 0;
        }
      } else if (widthDevice <= 960 && widthDevice > 650) {
        if (count > slide.length - 2) {
          count = 0;
        }
      } else if (widthDevice <= 650) {
        if (count > slide.length - 1) {
          count = 0;
        }
      } else {
        if (count > slide.length - 4) {
          count = 0;
        }
      }

      rollSlider();
      indicatorActive();
      indicatorDynamic();
      console.log(count);
    });

    item.querySelector('.slider__btn-prev').addEventListener('click', function () {
      count--;
      if (widthDevice <= 1270 && widthDevice > 960) {
        if (count < 0) {
          count = slide.length - 3;
        }
      } else if (widthDevice <= 960 && widthDevice > 650) {
        if (count < 0) {
          count = slide.length - 2;
        }
      } else if (widthDevice <= 650) {
        if (count < 0) {
          count = slide.length - 1;
        }
      } else {
        if (count < 0) {
          count = slide.length - 4;
        }
      }

      rollSlider();
      indicatorActive();
      indicatorDynamic();
    });

    function rollSlider() {
      if (widthDevice <= 1270 && widthDevice > 960) {
        sliderLine.style.transform = 'translate(-' + count * (width / 3) + 'px)';
      } else if (widthDevice <= 960 && widthDevice > 650) {
        sliderLine.style.transform = 'translate(-' + count * (width / 2) + 'px)';
      } else if (widthDevice <= 650) {
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
      } else {
        sliderLine.style.transform = 'translate(-' + count * (width / 4) + 'px)';
      }
    }
  }

  //---slider category-----------
  sliderWork(sliderBox);

  //---slider banners------
  sliderCreate(sliderBlock);
}
