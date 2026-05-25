'use strict';

export function burgerMenu() {
  const btnMenu = document.querySelector('#btn-menu');
  const mobileMenu = document.querySelector('#mobile-menu');
  const filtersMenu = document.querySelector('#filters-menu');

  btnMenu.addEventListener('click', menuMobile);
  function menuMobile() {
    if (document.body.classList.contains('_lock')) {
      if (!filtersMenu || !filtersMenu.classList.contains('filters_active')) {
        document.body.classList.remove('_lock');
      }
    } else {
      document.body.classList.add('_lock');
    }

    btnMenu.classList.toggle('btn-menu_active');
    mobileMenu.classList.toggle('header__mobile_active');
  }
}
