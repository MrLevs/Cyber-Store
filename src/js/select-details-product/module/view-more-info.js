'use strict';

export function viewMoreInfo() {
  const btnMoreInfo = document.querySelector('#btn-more-info');
  const containerMoreInfo = document.querySelector('#container-more-info');
  const btnCollapseInfo = document.querySelector('#collapse-info');
  const btnViewMoreInfo = document.querySelector('#view-more-info');
  const containerViewMoreInfo = document.querySelector('#container-view-more-info');

  if (btnMoreInfo) {
    btnMoreInfo.addEventListener('click', event => {
      event.preventDefault();
      stepsMoreInfo();
    });

    btnMoreInfo.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        stepsMoreInfo();
      }
    });

    function stepsMoreInfo() {
      openMoreInfo(containerMoreInfo);
      btnMoreInfo.classList.add('info__description-btn_hidden');
      btnCollapseInfo.disabled = false;
      btnMoreInfo.blur();
    }
  }

  if (btnCollapseInfo) {
    btnCollapseInfo.disabled = true;
    btnCollapseInfo.addEventListener('click', event => {
      event.preventDefault();
      collapseInfo();
    });

    btnCollapseInfo.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        collapseInfo();
      }
    });

    function collapseInfo() {
      if (containerMoreInfo.classList.contains('container-more-info_active')) {
        containerMoreInfo.classList.remove('container-more-info_active');
        containerMoreInfo.style.maxHeight = null;
        btnMoreInfo.classList.remove('info__description-btn_hidden');
      }
      btnCollapseInfo.blur();
      btnCollapseInfo.disabled = true;
    }
  }

  if (btnViewMoreInfo) {
    btnViewMoreInfo.addEventListener('click', event => {
      event.preventDefault();
      stepsViewMoreInfo();
    });

    btnViewMoreInfo.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        stepsViewMoreInfo();
      }
    });

    function stepsViewMoreInfo() {
      openMoreInfo(containerViewMoreInfo);
      if (btnViewMoreInfo.classList.contains('view-more_active')) {
        btnViewMoreInfo.classList.remove('view-more_active');
        btnViewMoreInfo.textContent = 'View More';
      } else {
        btnViewMoreInfo.classList.add('view-more_active');
        btnViewMoreInfo.textContent = 'Collapse';
      }
      btnViewMoreInfo.blur();
    }
  }

  function openMoreInfo(container) {
    if (container.classList.contains('container-more-info_active')) {
      container.classList.remove('container-more-info_active');
      container.style.maxHeight = null;
    } else {
      container.classList.add('container-more-info_active');
      container.style.maxHeight = container.scrollHeight + 'px';
    }
  }
}
