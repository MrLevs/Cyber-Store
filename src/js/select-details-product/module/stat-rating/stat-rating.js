'use strict';

export function statRating(arrayReviews = []) {
  const counts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  let sum = 0;
  let total = 0;

  if (!Array.isArray(arrayReviews)) {
    return { counts, total: 0, average: 0 };
  }

  for (const review of arrayReviews) {
    const star = Number(review?.rating);

    if (Object.hasOwn(counts, star)) {
      counts[star] += 1;
      sum += star;
      total += 1;
    }
  }

  const average = total > 0 ? Number((sum / total).toFixed(1)) : 0;
  return {
    counts,
    total,
    average,
  };
}
