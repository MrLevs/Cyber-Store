'use strict';

import { Slider } from './modules/slider/class-slider';
import { SliderBanners } from './modules/slider/class-slider-banners';

export function slider() {
  //---slider category-----------
  const sliderItem = document.querySelector('.slider_item');
  if (sliderItem) {
    new Slider(sliderItem);
  }

  //---slider banners------
  const sliderItemBanners = document.querySelector('.slider_item-banners');
  if (sliderItemBanners) {
    new SliderBanners(sliderItemBanners);
  }
}
