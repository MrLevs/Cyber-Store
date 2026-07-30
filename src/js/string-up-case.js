'use strict';

export function strUpCase(str) {
  if (!str) return str;

  return str
    .split(' ')
    .map(item => {
      if (item.includes('-')) {
        return item
          .split('-')
          .map(elem => {
            return elem[0].toUpperCase() + elem.slice(1).toLowerCase();
          })
          .join('-');
      } else {
        return item[0].toUpperCase() + item.slice(1).toLowerCase();
      }
    })
    .join(' ');
}
