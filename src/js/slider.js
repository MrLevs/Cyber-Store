'use strict';

import Slider from './modules/slider/class-slider';
import SliderBanners from './modules/slider/class-slider-banners';

export default function () {
  //---slider category-----------
  const sliderItem = document.querySelector('.slider_item');
  new Slider(sliderItem);

  //---slider banners------

  const sliderItemBanners = document.querySelector('.slider_item-banners');
  new SliderBanners(sliderItemBanners);
}
