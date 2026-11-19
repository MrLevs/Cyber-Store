'use strict';

const RATINGS_MAP = [
  { id: 'excellent', score: 5 },
  { id: 'good', score: 4 },
  { id: 'average', score: 3 },
  { id: 'below', score: 2 },
  { id: 'poor', score: 1 },
];

export function createStatReviews(objStat) {
  const statReviews = document.querySelector('.reviews__stat');
  if (!statReviews || !objStat?.counts) return;

  const total = objStat.total || 1;

  RATINGS_MAP.forEach(({ id, score }) => {
    const meter = statReviews.querySelector(`#${id}`);
    const countEl = statReviews.querySelector(`#${id}-count`);
    const count = objStat.counts[score] ?? 0;

    if (meter) {
      meter.max = total;
      meter.value = count;
    }

    if (countEl) {
      countEl.textContent = count;
    }
  });
}
