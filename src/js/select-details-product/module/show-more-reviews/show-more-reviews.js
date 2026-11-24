'use strict';

import { mainShowReviews } from './module/main-show-reviews'; // Main Show Reviews
import { createReview } from './module/create-review'; // Create Review

const INITIAL_COUNT = 3;

export function showMoreReviews(arrayDataReviews) {
  const btnShowReviews = document.querySelector('#reviews-more');
  const containerReviews = document.querySelector('.reviews__box');

  if (!btnShowReviews || !containerReviews) return;

  const firstReviews = arrayDataReviews.slice(0, INITIAL_COUNT);
  firstReviews.forEach(item => {
    createReview(item, containerReviews);
  });

  const remainingReviews = arrayDataReviews.slice(INITIAL_COUNT);

  if (remainingReviews.length === 0) {
    btnShowReviews.computedStyleMap.display = 'none';
    return;
  }

  const initialReviewsCount = containerReviews.children.length;
  const { loadReviews, collapseReviews } = mainShowReviews(remainingReviews, containerReviews);

  let isExpanded = false;

  btnShowReviews.addEventListener('click', () => {
    if (isExpanded) {
      collapseReviews(initialReviewsCount);
      btnShowReviews.textContent = 'View More';
      isExpanded = false;
    } else {
      const isComplete = loadReviews();
      if (isComplete) {
        btnShowReviews.textContent = 'Collapse Reviews';
        isExpanded = true;
      }
    }
  });

  function xxxx() {
    const lightboxModal = document.querySelector('#dialog-lightbox');
    const lightboxImg = lightboxModal?.querySelector('.lightbox__img');
    const btnCloseLightbox = document.querySelector('#close-dialog-lightbox');

    if (lightboxModal && lightboxImg && containerReviews) {
      // Открытие фото по клику на любую миниатюру в отзывах
      containerReviews.addEventListener('click', event => {
        const clickedImg = event.target.closest('.review__image');
        if (!clickedImg) return;

        lightboxImg.src = clickedImg.src;
        lightboxImg.alt = clickedImg.alt || 'Full size review photo';
        document.body.classList.add('_lock');
        lightboxModal.showModal();
      });

      // Закрытие по кнопке крестика
      if (btnCloseLightbox) {
        btnCloseLightbox.addEventListener('click', () => {
          lightboxModal.close();
        });
      }

      // Закрытие по клику на тёмный фон (backdrop) вокруг картинки
      lightboxModal.addEventListener('click', event => {
        if (event.target === lightboxModal) {
          lightboxModal.close();
        }
      });

      // Возврат скролла и очистка src при любом способе закрытия (включая Esc)
      lightboxModal.addEventListener('close', () => {
        document.body.classList.remove('_lock');
        lightboxImg.src = '';
      });
    }
  }

  xxxx(); // отредактировать HTML SCSS JS DIALOG;
}
