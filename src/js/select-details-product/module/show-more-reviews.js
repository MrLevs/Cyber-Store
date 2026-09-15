'use strict';

export function showMoreReviews() {
  const btnShowReviews = document.querySelector('#reviews-more');

  if (btnShowReviews) {
    btnShowReviews.addEventListener('click', () => {
      console.log('click');
      const date = new Date();
      const day = date.getDay();
      const month = date.toLocaleString('en-GB', { month: 'long' });
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const fullDate = `${day} ${month} ${year} - ${hours}:${minutes}`;
      console.log(fullDate);
    });
    btnShowReviews.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        console.log('Enter');
      }
    });
  }
}
