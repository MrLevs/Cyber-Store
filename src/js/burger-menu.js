'use strict';

export default function () {
  const btnMenu = document.querySelector('#btn-menu');
  const mobileMenu = document.querySelector('#mobile-menu');

  btnMenu.addEventListener('click', menuMobile);
  function menuMobile() {
    document.body.classList.toggle('_lock');
    btnMenu.classList.toggle('btn-menu_active');
    mobileMenu.classList.toggle('header__mobile_active');
  }
}
