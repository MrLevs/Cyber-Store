'use strict';

export function validationAll(value) {
  const pattern = /^[a-zа-я\d\s-]+$/gi;
  return pattern.test(value);
}
