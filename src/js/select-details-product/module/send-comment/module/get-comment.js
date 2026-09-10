'use strict';

import { showWarningInput } from '../../../../warning'; // Show Warning Input
import { strUpCase } from '../../../../string-up-case'; // String UpperCase

export function getComment() {
  const message = 'Warning!!! The field must be filled in correctly and cannot be left blank!';
  const inputName = document.querySelector('#form-review-name');
  const inputSurname = document.querySelector('#form-review-surname');
  const inputComment = document.querySelector('#form-review-comment');
  const ratingWarning = document.querySelector('.form-review__rating-warning');
  const file = document.querySelector('#form-review-file');
  let rating = document.querySelector('input[name="stars"]:checked');
  let name = inputName.value.trim();
  let surname = inputSurname.value.trim();
  let comment = inputComment.value.replace(/\s+/g, ' ').trim();
  let userReview = {};

  if (name === '' || inputName.classList.contains('warning__input')) {
    showWarningInput(inputName, message);
  } else {
    userReview.name = strUpCase(name);
  }

  if (surname === '' || inputSurname.classList.contains('warning__input')) {
    showWarningInput(inputSurname, message);
  } else {
    userReview.surname = strUpCase(surname);
  }

  if (rating) {
    userReview.rating = rating.value;
  } else {
    let stars = document.querySelectorAll('.form-review__svg');
    stars.forEach(item => {
      item.classList.add('form-review__svg_warning');
    });
    ratingWarning.style.display = 'block';
    ratingWarning.textContent = 'Rate the product!';
  }

  if (inputComment.classList.contains('warning__input')) {
    showWarningInput(inputComment, message);
  } else {
    userReview.comment = comment;
  }

  if (file.files.length > 0) {
    userReview.file = file.files;
  }

  if (
    userReview.name !== undefined &&
    userReview.surname !== undefined &&
    userReview.rating !== undefined &&
    !inputComment.classList.contains('warning__input')
  ) {
    return userReview;
  }
}
