'use strict';

export function initLightbox() {
  const containerReviews = document.querySelector('.reviews__box');
  const lightboxModal = document.querySelector('#dialog-lightbox');
  const lightboxContainer = lightboxModal?.querySelector('.lightbox__inner');
  const btnCloseLightbox = document.querySelector('#close-dialog-lightbox');

  if (!lightboxModal || !containerReviews) return;

  let currentImages = [];
  let currentIndex = 0;

  let lightboxImg = null;
  let btnPrev = null;
  let btnNext = null;

  function updateLightboxImage() {
    const targetImg = currentImages[currentIndex];
    if (!targetImg || !lightboxImg) return;

    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt || 'Full size review photo';
  }

  function showNext() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
  }

  function showPrev() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  }

  function createLightboxElements() {
    lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox__img';
    lightboxContainer.append(lightboxImg);

    if (currentImages.length > 1) {
      btnPrev = document.createElement('button');
      btnPrev.type = 'button';
      btnPrev.className = 'lightbox__btn lightbox__btn_prev';
      btnPrev.setAttribute('aria-label', 'Previous photo');
      btnPrev.addEventListener('click', showPrev);

      btnNext = document.createElement('button');
      btnNext.type = 'button';
      btnNext.className = 'lightbox__btn lightbox__btn_next';
      btnNext.setAttribute('aria-label', 'Next photo');
      btnNext.addEventListener('click', showNext);

      lightboxContainer.append(btnPrev, btnNext);
    }
  }

  function destroyLightboxElements() {
    lightboxImg?.remove();
    btnPrev?.remove();
    btnNext?.remove();

    lightboxImg = null;
    btnPrev = null;
    btnNext = null;
  }

  containerReviews.addEventListener('click', event => {
    const clickedImg = event.target.closest('.review__image');
    if (!clickedImg) return;

    const reviewCard = clickedImg.closest('.review__images');
    currentImages = Array.from(reviewCard.querySelectorAll('.review__image'));
    currentIndex = currentImages.indexOf(clickedImg);

    destroyLightboxElements();
    createLightboxElements();
    updateLightboxImage();

    document.body.classList.add('_lock');
    lightboxModal.showModal();
  });

  document.addEventListener('keydown', event => {
    if (!lightboxModal.open) return;
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });

  btnCloseLightbox?.addEventListener('click', () => {
    lightboxModal.close();
  });

  lightboxModal.addEventListener('click', event => {
    if (event.target === lightboxModal) {
      lightboxModal.close();
    }
  });

  lightboxModal.addEventListener('close', () => {
    document.body.classList.remove('_lock');
    destroyLightboxElements();
    currentImages = [];
    currentIndex = 0;
  });
}
