'use strict';

export function viewMoreInfo() {
  const containerProductInfo = document.querySelector('#main-product-details');
  const btnCollapseInfo = document.querySelector('#collapse-info');

  if (containerProductInfo) {
    containerProductInfo.addEventListener('click', event => {
      let btn = event.target.closest('.btn-more-info');
      if (btn) {
        openMoreInfo(btn);

        if (btn.classList.contains('info__description-btn')) {
          btn.classList.add('info__description-btn_hidden');
        } else if (btn.classList.contains('view-more')) {
          if (btn.classList.contains('view-more_active')) {
            btn.classList.remove('view-more_active');
            btn.textContent = 'View More';
          } else {
            btn.classList.add('view-more_active');
            btn.textContent = 'Collapse';
          }
        }
        btn.blur();
      }
    });
  }

  if (btnCollapseInfo) {
    btnCollapseInfo.addEventListener('click', event => {
      event.preventDefault();

      const container = event.target.parentNode.parentNode.parentNode.querySelector('.container-more-info');
      const btn = container.querySelector('.info__description-btn');
      if (container.classList.contains('container-more-info_active')) {
        container.classList.remove('container-more-info_active');
        container.style.maxHeight = null;
        btn.classList.remove('info__description-btn_hidden');
      }
    });
  }

  function openMoreInfo(btn) {
    const container = btn.parentNode.parentNode.parentNode.querySelector('.container-more-info');

    if (container.classList.contains('container-more-info_active')) {
      container.classList.remove('container-more-info_active');
      container.style.maxHeight = null;
    } else {
      container.classList.add('container-more-info_active');
      container.style.maxHeight = container.scrollHeight + 'px';
    }
  }
}
